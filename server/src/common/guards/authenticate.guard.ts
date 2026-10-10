import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtTokenService } from '../../modules/auth/services/jwt/jwt-token.service';

export interface AuthenticatedUser {
  id: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}

@Injectable()
export class AuthenticateGuard implements CanActivate {
  constructor(private readonly jwtTokenService: JwtTokenService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const authorization = request.headers.authorization;
    const [scheme, token, ...extra] = authorization?.trim().split(/\s+/) ?? [];

    if (scheme?.toLowerCase() !== 'bearer' || !token || extra.length > 0) {
      throw new UnauthorizedException('Bearer access token is required');
    }

    try {
      const payload = this.jwtTokenService.verifyAccessToken(token);

      if (
        payload.type !== 'access' ||
        typeof payload.sub !== 'string' ||
        typeof payload.email !== 'string'
      ) {
        throw new UnauthorizedException('Invalid access token');
      }

      request.user = {
        id: payload.sub,
        email: payload.email,
      };

      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }
}
