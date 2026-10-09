import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { timingSafeEqual } from 'node:crypto';

import { RedisDataService } from 'src/infrastructure/redis/redis-data.service';

import {
  CreatedSession,
  SessionIdentity,
  SessionRecord,
} from './session.types';

import {
  generateSessionId,
  generateSessionSecret,
  hashSessionSecret,
  parseRefreshToken,
} from './session.utils';

const DEFAULT_SESSION_TTL = 30 * 24 * 60 * 60;

@Injectable()
export class SessionService {
  private readonly sessionTtl: number;

  constructor(
    private readonly redis: RedisDataService,
    private readonly configService: ConfigService,
  ) {
    this.sessionTtl = DEFAULT_SESSION_TTL;

    if (!Number.isSafeInteger(this.sessionTtl) || this.sessionTtl <= 0) {
      throw new Error('Session TTL must be a positive integer');
    }
  }

  async create(
    sub: string,
    email: string,
    device?: SessionRecord['device'],
  ): Promise<CreatedSession> {
    if (!sub) {
      throw new Error('User ID is required to create a session');
    }

    const sid = generateSessionId();
    const secret = generateSessionSecret();
    const now = Date.now();

    const session: SessionRecord = {
      sid,
      sub,
      email,
      status: 'active',
      refreshTokenHash: hashSessionSecret(secret),
      createdAt: now,
      lastUsedAt: now,
      expiresAt: now + this.sessionTtl * 1000,
      ...(device ? { device } : {}),
    };

    const sessionKey = this.sessionKey(sid);
    const userSessionsKey = this.userSessionsKey(sub);

    await this.redis.setWithExpiry(
      sessionKey,
      JSON.stringify(session),
      this.sessionTtl,
    );

    try {
      await this.redis.addToSet(userSessionsKey, sid);
    } catch (error) {
      await this.redis.delete(sessionKey);
      throw error;
    }

    return {
      sid,
      sub,
      email,
      refreshToken: `${sid}.${secret}`,
      expiresIn: this.sessionTtl,
    };
  }

  async find(refreshToken: string): Promise<SessionIdentity> {
    const parsed = parseRefreshToken(refreshToken);

    if (!parsed) {
      throw new UnauthorizedException('Invalid session');
    }

    const { sid, secret } = parsed;
    const sessionKey = this.sessionKey(sid);
    const raw = await this.redis.get(sessionKey);

    if (!raw) {
      throw new UnauthorizedException('Invalid session');
    }

    const session = this.parseSession(raw);

    if (
      session.sid !== sid ||
      session.status !== 'active' ||
      session.expiresAt <= Date.now() ||
      !this.matchesSecret(secret, session.refreshTokenHash)
    ) {
      throw new UnauthorizedException('Invalid session');
    }

    session.lastUsedAt = Date.now();

    const remainingTtl = this.remainingTtl(session.expiresAt);

    if (remainingTtl <= 0) {
      await this.redis.delete(sessionKey);
      throw new UnauthorizedException('Session expired');
    }

    await this.redis.setWithExpiry(
      sessionKey,
      JSON.stringify(session),
      remainingTtl,
    );

    return this.toIdentity(session);
  }

  async destroy(sid: string, sub: string): Promise<void> {
    if (!this.isValidSessionId(sid) || !sub) {
      return;
    }

    const sessionKey = this.sessionKey(sid);
    const raw = await this.redis.get(sessionKey);

    if (!raw) {
      await this.redis.removeFromSet(this.userSessionsKey(sub), sid);
      return;
    }

    const session = this.parseSession(raw);

    // Prevent one user from revoking another user's session.
    if (session.sid !== sid || session.sub !== sub) {
      return;
    }

    const remainingTtl = this.remainingTtl(session.expiresAt);

    if (remainingTtl > 0) {
      session.status = 'revoked';
      session.refreshTokenHash = '';

      await this.redis.setWithExpiry(
        sessionKey,
        JSON.stringify(session),
        remainingTtl,
      );
    } else {
      await this.redis.delete(sessionKey);
    }

    await this.redis.removeFromSet(this.userSessionsKey(sub), sid);
  }

  async rotate(refreshToken: string): Promise<CreatedSession> {
    const parsed = parseRefreshToken(refreshToken);

    if (!parsed) {
      throw new UnauthorizedException('Invalid session');
    }

    const { sid, secret } = parsed;
    const sessionKey = this.sessionKey(sid);
    const raw = await this.redis.get(sessionKey);

    if (!raw) {
      throw new UnauthorizedException('Invalid session');
    }

    const session = this.parseSession(raw);

    if (
      session.sid !== sid ||
      session.status !== 'active' ||
      session.expiresAt <= Date.now() ||
      !this.matchesSecret(secret, session.refreshTokenHash)
    ) {
      throw new UnauthorizedException('Invalid session');
    }

    const newSecret = generateSessionSecret();
    const now = Date.now();
    const remainingTtl = this.remainingTtl(session.expiresAt);

    if (remainingTtl <= 0) {
      await this.redis.delete(sessionKey);
      throw new UnauthorizedException('Session expired');
    }

    session.refreshTokenHash = hashSessionSecret(newSecret);
    session.lastUsedAt = now;

    await this.redis.setWithExpiry(
      sessionKey,
      JSON.stringify(session),
      remainingTtl,
    );

    return {
      sid,
      sub: session.sub,
      email: session.email,
      refreshToken: `${sid}.${newSecret}`,
      expiresIn: remainingTtl,
    };
  }

  private parseSession(raw: string): SessionRecord {
    try {
      const value: unknown = JSON.parse(raw);

      if (
        typeof value !== 'object' ||
        value === null ||
        !('sid' in value) ||
        !('sub' in value) ||
        !('status' in value) ||
        !('refreshTokenHash' in value) ||
        !('expiresAt' in value) ||
        !('createdAt' in value) ||
        !('lastUsedAt' in value)
      ) {
        throw new Error('Invalid session structure');
      }

      const session = value as SessionRecord;

      if (
        typeof session.sid !== 'string' ||
        typeof session.sub !== 'string' ||
        !['active', 'revoked', 'compromised'].includes(session.status) ||
        typeof session.refreshTokenHash !== 'string' ||
        typeof session.expiresAt !== 'number' ||
        !Number.isFinite(session.expiresAt) ||
        typeof session.createdAt !== 'number' ||
        typeof session.lastUsedAt !== 'number'
      ) {
        throw new Error('Invalid session fields');
      }

      return session;
    } catch {
      throw new InternalServerErrorException('Stored session data is invalid');
    }
  }

  private matchesSecret(secret: string, storedHash: string): boolean {
    if (!/^[a-f0-9]{64}$/.test(storedHash)) {
      return false;
    }

    const providedHash = Buffer.from(hashSessionSecret(secret), 'hex');
    const expectedHash = Buffer.from(storedHash, 'hex');

    return timingSafeEqual(providedHash, expectedHash);
  }

  private remainingTtl(expiresAt: number): number {
    return Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));
  }

  private toIdentity(session: SessionRecord): SessionIdentity {
    const { sid, sub, status, createdAt, lastUsedAt, expiresAt, device } =
      session;

    return {
      sid,
      sub,
      status,
      createdAt,
      lastUsedAt,
      expiresAt,
      device,
    };
  }

  private sessionKey(sid: string): string {
    return `session:${sid}`;
  }

  private userSessionsKey(sub: string): string {
    return `user:sessions:${sub}`;
  }

  private isValidSessionId(sid: string): boolean {
    return /^[A-Za-z0-9_-]{22}$/.test(sid);
  }
}
