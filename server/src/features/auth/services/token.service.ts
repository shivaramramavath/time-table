import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import { SignJWT, jwtVerify } from 'jose';

import { env } from '#configs/env.js';
import { ACCESS_TOKEN_EXPIRES_IN } from '#configs/constants.js';

export interface AccessTokenPayload {
  sub: string;
}

export class TokenService {
  secret = new TextEncoder().encode(env.JWT_SECRET_KEY);

  generateAccessToken(userId: string): Promise<string> | string {
    return new SignJWT()
      .setSubject(userId)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(ACCESS_TOKEN_EXPIRES_IN)
      .sign(this.secret);
  }

  generateRefreshToken(sessionId: string): string {
    const secret = crypto.randomBytes(32).toString('base64url');

    return `${sessionId}.${secret}`;
  }

  async verifyAccessToken(token: string): Promise<AccessTokenPayload> {
    const { payload } = await jwtVerify(token, this.secret);

    return payload as AccessTokenPayload;
  }

  getDataFromRefreshToken(refreshToken: string): string[] {
    if (!refreshToken) {
      throw new Error('Refresh token not found');
    }

    return refreshToken.split('.');
  }

  generatePasswordResetToken(): string {
    return crypto.randomBytes(32).toString('base64url');
  }
}
