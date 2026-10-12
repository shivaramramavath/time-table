import type {
  AccessTokenPayload,
  PasswordResetTokenPayload,
  RefreshTokenPayload,
} from './token.types';

export abstract class TokenService {
  abstract signAccessToken(payload: Omit<AccessTokenPayload, 'type'>): string;

  abstract verifyAccessToken(token: string): AccessTokenPayload;

  abstract signRefreshToken(payload: Omit<RefreshTokenPayload, 'type'>): string;

  abstract verifyRefreshToken(token: string): RefreshTokenPayload;

  abstract signPasswordResetToken(sub: string): string;

  abstract verifyPasswordResetToken(token: string): PasswordResetTokenPayload;
}
