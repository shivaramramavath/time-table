import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

import { CookieService } from '../../../shared/core/security/cookie/cookie.service';
import { TokenService } from '../../../shared/core/security/token/token.service';
import type { RefreshTokenPayload } from '../../../shared/core/security/token/token.types';
import { REFRESH_COOKIE } from '../controllers/auth.controller';

export interface RefreshTokenRequest extends Request {
  refreshTokenPayload?: RefreshTokenPayload;
}

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private readonly cookieService: CookieService,
    private readonly tokenService: TokenService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RefreshTokenRequest>();

    const refreshToken = this.cookieService.get(request, REFRESH_COOKIE);

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    try {
      const payload = this.tokenService.verifyRefreshToken(refreshToken);

      if (
        payload.type !== 'refresh' ||
        !payload.sid ||
        !payload.sub ||
        !payload.secret
      ) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      request.refreshTokenPayload = payload;

      return true;
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
