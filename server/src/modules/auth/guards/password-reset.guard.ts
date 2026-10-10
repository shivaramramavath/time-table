import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtTokenService } from '../services/jwt/jwt-token.service';
import type { PasswordResetTokenPayload } from '../services/jwt/jwt-token.types';

export interface PasswordResetRequest extends Request {
  passwordResetPayload?: PasswordResetTokenPayload;
}

@Injectable()
export class PasswordResetGuard implements CanActivate {
  constructor(private readonly jwtTokenService: JwtTokenService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<PasswordResetRequest>();

    const token = request.query.token;

    if (typeof token !== 'string' || !token.trim()) {
      throw new UnauthorizedException('Password reset token is required');
    }

    try {
      const payload = this.jwtTokenService.verifyPasswordResetToken(token);

      if (payload.type !== 'password-reset' || !payload.sub || !payload.jti) {
        throw new UnauthorizedException('Invalid password reset token');
      }

      request.passwordResetPayload = payload;

      return true;
    } catch {
      throw new UnauthorizedException(
        'Invalid or expired password reset token',
      );
    }
  }
}
