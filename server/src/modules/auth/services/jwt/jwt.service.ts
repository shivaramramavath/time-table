import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenPayload } from './jwt.types';

@Injectable()
export class JwtTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  signAccessToken(payload: Omit<AccessTokenPayload, 'type'>): string {
    return this.jwtService.sign(
      { ...payload, type: 'access' },
      {
        secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      },
    );
  }

  verifyAccessToken(token: string): AccessTokenPayload {
    const payload = this.jwtService.verify<AccessTokenPayload>(token, {
      secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
    });

    if (payload.type !== 'access' || !payload.sub) {
      throw new Error('Invalid access token payload');
    }

    return payload;
  }
}
