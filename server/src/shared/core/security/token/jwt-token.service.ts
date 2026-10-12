import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, type JwtSignOptions } from '@nestjs/jwt';
import { randomUUID } from 'node:crypto';

import { TokenService } from './token.service';
import type {
  AccessTokenPayload,
  PasswordResetTokenPayload,
  RefreshTokenPayload,
} from './token.types';

type TokenPayload =
  AccessTokenPayload | RefreshTokenPayload | PasswordResetTokenPayload;

@Injectable()
export class JwtTokenService extends TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  signAccessToken(payload: Omit<AccessTokenPayload, 'type'>): string {
    return this.sign({ ...payload, type: 'access' });
  }

  verifyAccessToken(token: string): AccessTokenPayload {
    const payload = this.verify<AccessTokenPayload>(token, 'jwt.access.secret');

    if (payload.type !== 'access' || !payload.sub) {
      throw new UnauthorizedException('Invalid access token');
    }

    return payload;
  }

  signRefreshToken(payload: Omit<RefreshTokenPayload, 'type'>): string {
    return this.sign({ ...payload, type: 'refresh' });
  }

  verifyRefreshToken(token: string): RefreshTokenPayload {
    const payload = this.verify<RefreshTokenPayload>(
      token,
      'jwt.refresh.secret',
    );

    if (payload.type !== 'refresh' || !payload.sub || !payload.sid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return payload;
  }

  signPasswordResetToken(sub: string): string {
    return this.sign({
      sub,
      jti: randomUUID(),
      type: 'password-reset',
    });
  }

  verifyPasswordResetToken(token: string): PasswordResetTokenPayload {
    const payload = this.verify<PasswordResetTokenPayload>(
      token,
      'jwt.forgotPassword.secret',
    );

    if (payload.type !== 'password-reset' || !payload.sub || !payload.jti) {
      throw new UnauthorizedException('Invalid password reset token');
    }

    return payload;
  }

  private sign(payload: TokenPayload): string {
    const { secretPath, expiresInPath } = this.getTokenConfigPaths(
      payload.type,
    );

    const secret = this.configService.getOrThrow<string>(secretPath);
    const expiresIn = this.configService.getOrThrow<string>(expiresInPath);

    return this.jwtService.sign(payload, {
      secret,
      expiresIn: expiresIn as JwtSignOptions['expiresIn'],
    });
  }

  private verify<T extends TokenPayload>(token: string, secretPath: string): T {
    try {
      return this.jwtService.verify<T>(token, {
        secret: this.configService.getOrThrow<string>(secretPath),
      });
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private getTokenConfigPaths(type: TokenPayload['type']): {
    secretPath: string;
    expiresInPath: string;
  } {
    switch (type) {
      case 'access':
        return {
          secretPath: 'jwt.access.secret',
          expiresInPath: 'jwt.access.expiresIn',
        };

      case 'refresh':
        return {
          secretPath: 'jwt.refresh.secret',
          expiresInPath: 'jwt.refresh.expiresIn',
        };

      case 'password-reset':
        return {
          secretPath: 'jwt.forgotPassword.secret',
          expiresInPath: 'jwt.forgotPassword.expiresIn',
        };
    }
  }
}
