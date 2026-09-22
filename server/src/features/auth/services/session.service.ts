import crypto from 'node:crypto';
import createHttpError from 'http-errors';

import type { Redis } from 'ioredis';

import { SESSION_TTL } from '#configs/constants.js';

import { TokenService } from './token.service.js';

interface SessionData {
  userId: string;
  refreshTokenHash: string;
}

interface CreateSessionResult {
  sessionId: string;
  refreshToken: string;
}

interface RotateSessionResult {
  userId: string;
  refreshToken: string;
}

const SESSION_PREFIX = 'session';
const PASSWORD_RESET_PREFIX = 'forgot-password';

export class SessionService {
  constructor(
    private readonly redis: Redis,
    private readonly tokenService: TokenService,
  ) {}

  private getSessionKey(sessionId: string): string {
    return `${SESSION_PREFIX}:${sessionId}`;
  }

  private getPasswordResetKey(token: string): string {
    return `${PASSWORD_RESET_PREFIX}:${token}`;
  }

  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  async create(userId: string): Promise<CreateSessionResult> {
    const sessionId = crypto.randomUUID();

    const refreshToken = this.tokenService.generateRefreshToken(sessionId);

    const session: SessionData = {
      userId,
      refreshTokenHash: this.hashToken(refreshToken),
    };

    await this.redis.set(this.getSessionKey(sessionId), JSON.stringify(session), 'EX', SESSION_TTL);

    return {
      sessionId,
      refreshToken,
    };
  }

  async get(sessionId: string): Promise<SessionData | null> {
    const session = await this.redis.get(this.getSessionKey(sessionId));

    if (!session) {
      return null;
    }

    return JSON.parse(session) as SessionData;
  }

  async validate(sessionId: string, refreshToken: string): Promise<SessionData> {
    const session = await this.get(sessionId);

    if (!session) {
      throw createHttpError.Unauthorized('Session not found');
    }

    const storedHash = Buffer.from(session.refreshTokenHash, 'hex');

    const providedHash = Buffer.from(this.hashToken(refreshToken), 'hex');

    if (
      storedHash.length !== providedHash.length ||
      !crypto.timingSafeEqual(storedHash, providedHash)
    ) {
      throw createHttpError.Unauthorized('Invalid refresh token');
    }

    return session;
  }

  async rotate(refreshToken: string): Promise<RotateSessionResult> {
    const [sessionId] = this.tokenService.getDataFromRefreshToken(refreshToken);

    const session = await this.validate(sessionId, refreshToken);

    const newRefreshToken = this.tokenService.generateRefreshToken(sessionId);

    session.refreshTokenHash = this.hashToken(newRefreshToken);

    await this.redis.set(this.getSessionKey(sessionId), JSON.stringify(session), 'EX', SESSION_TTL);

    return {
      userId: session.userId,
      refreshToken: newRefreshToken,
    };
  }

  async revoke(refreshToken: string): Promise<void> {
    const { sessionId } = this.tokenService.getDataFromRefreshToken(refreshToken);

    await this.redis.del(this.getSessionKey(sessionId));
  }

  async generateForgotPasswordToken(userId: string): Promise<string> {
    const token = this.tokenService.generatePasswordResetToken();

    await this.redis.set(this.getPasswordResetKey(token), userId, 'EX', 15 * 60);

    return token;
  }

  async getUserIdFromPasswordResetToken(token: string): Promise<string> {
    const userId = await this.redis.get(this.getPasswordResetKey(token));

    if (!userId) {
      throw createHttpError.BadRequest('Invalid or expired token');
    }

    // Single-use token.
    await this.redis.del(this.getPasswordResetKey(token));

    return userId;
  }
}
