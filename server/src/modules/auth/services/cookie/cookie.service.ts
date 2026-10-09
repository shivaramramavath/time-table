import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { CookieOptions, Request, Response } from 'express';

@Injectable()
export class CookieService {
  private readonly baseCookieOptions: CookieOptions;

  constructor(private readonly configService: ConfigService) {
    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';

    this.baseCookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/api/auth',
    };
  }

  set(
    res: Response,
    name: string,
    value: string,
    options: CookieOptions = {},
  ): void {
    res.cookie(name, value, {
      ...this.baseCookieOptions,
      ...options,
    });
  }

  get(req: Request, name: string): string {
    const value: unknown = req.cookies?.[name];

    if (typeof value !== 'string') {
      throw new Error(`Cookie "${name}" not found`);
    }

    return value;
  }

  clear(res: Response, name: string, options: CookieOptions = {}): void {
    res.clearCookie(name, {
      ...this.baseCookieOptions,
      ...options,
    });
  }
}
