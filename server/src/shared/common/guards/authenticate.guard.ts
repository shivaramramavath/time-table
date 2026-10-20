import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ROLES } from '../../../modules/user/entities/user.entity';
import { TokenService } from '../../core/security/token/token.service';
import { Role } from '../../core/security/token/token.types';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: Role;
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}

@Injectable()
export class AuthenticateGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const authorization = request.headers.authorization;
    const [scheme, token, ...extra] = authorization?.trim().split(/\s+/) ?? [];

    if (scheme?.toLowerCase() !== 'bearer' || !token || extra.length > 0) {
      throw new UnauthorizedException('Bearer access token is required');
    }

    console.log(token);

    try {
      const payload = this.tokenService.verifyAccessToken(token);

      if (
        payload.type !== 'access' ||
        typeof payload.sub !== 'string' ||
        !payload.sub ||
        typeof payload.email !== 'string' ||
        !payload.email ||
        !ROLES.includes(payload.role)
      ) {
        throw new UnauthorizedException('Invalid access token');
      }

      console.log(payload);

      request.user = {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
      };

      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }
}
