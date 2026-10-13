import { Injectable, UnauthorizedException } from '@nestjs/common';
import { timingSafeEqual } from 'node:crypto';

import {
  CreatedSession,
  SessionIdentity,
  SessionRecord,
} from './session.types';

import { SessionRecordCache } from './session-record.cache';
import { UserSessionsCache } from './user-sessions.cache';

import {
  generateSessionId,
  generateSessionSecret,
  hashSessionSecret,
} from './session.utils';

@Injectable()
export class SessionService {
  constructor(
    private readonly sessionCache: SessionRecordCache,
    private readonly userSessionsCache: UserSessionsCache,
  ) {}

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
      ...(device ? { device } : {}),
    };

    await this.sessionCache.saveSession(session);

    try {
      await this.userSessionsCache.addSession(sub, sid);
    } catch (error) {
      await this.sessionCache.deleteSession(sid);
      throw error;
    }

    return {
      sid,
      sub,
      email,
      secret,
    };
  }

  async destroy(sid: string, sub: string): Promise<void> {
    if (!this.isValidSessionId(sid) || !sub) {
      return;
    }

    const session = await this.sessionCache.findSession(sid);

    if (!session) {
      await this.userSessionsCache.removeSession(sub, sid);
      return;
    }

    // Prevent one user from revoking another user's session.
    if (session.sid !== sid || session.sub !== sub) {
      return;
    }

    await this.sessionCache.deleteSession(sid);
    await this.userSessionsCache.removeSession(sub, sid);
  }

  async destroyByUserId(sub: string): Promise<void> {
    if (!sub) {
      return;
    }

    const sessionIds = await this.userSessionsCache.getSessionIds(sub);

    for (const sid of sessionIds) {
      await this.destroy(sid, sub);
    }

    await this.userSessionsCache.deleteUserSessions(sub);
  }

  async rotate({
    sid,
    secret,
  }: {
    sid: string;
    secret: string;
  }): Promise<CreatedSession> {
    if (!this.isValidSessionId(sid) || !secret) {
      throw new UnauthorizedException('Invalid session');
    }

    const session = await this.sessionCache.findSession(sid);

    if (
      !session ||
      session.sid !== sid ||
      session.status !== 'active' ||
      !this.matchesSecret(secret, session.refreshTokenHash)
    ) {
      throw new UnauthorizedException('Invalid session');
    }

    const newSecret = generateSessionSecret();
    const now = Date.now();

    session.refreshTokenHash = hashSessionSecret(newSecret);
    session.lastUsedAt = now;

    await this.sessionCache.setObject(sid, this.toCacheData(session));

    return {
      sid,
      sub: session.sub,
      email: session.email,
      secret: newSecret,
    };
  }

  async getIdentity(sid: string): Promise<SessionIdentity | null> {
    if (!this.isValidSessionId(sid)) {
      return null;
    }

    const session = await this.sessionCache.findSession(sid);

    if (!session) {
      return null;
    }

    if (session.status !== 'active') {
      return null;
    }

    return this.toIdentity(session);
  }

  async getUserSessionIds(sub: string): Promise<string[]> {
    if (!sub) {
      return [];
    }

    return this.userSessionsCache.getSessionIds(sub);
  }

  private matchesSecret(secret: string, storedHash: string): boolean {
    if (!/^[a-f0-9]{64}$/.test(storedHash)) {
      return false;
    }

    const providedHash = Buffer.from(hashSessionSecret(secret), 'hex');
    const expectedHash = Buffer.from(storedHash, 'hex');

    return (
      providedHash.length === expectedHash.length &&
      timingSafeEqual(providedHash, expectedHash)
    );
  }

  private toIdentity(session: SessionRecord): SessionIdentity {
    const { sid, sub, email, status, createdAt, lastUsedAt, device } = session;

    return {
      sid,
      sub,
      email,
      status,
      createdAt,
      lastUsedAt,
      device,
    };
  }

  private toCacheData(session: SessionRecord): Omit<SessionRecord, 'sid'> {
    const { sid: _sid, ...data } = session;

    return data;
  }

  private isValidSessionId(sid: string): boolean {
    return /^[A-Za-z0-9_-]{22}$/.test(sid);
  }
}
