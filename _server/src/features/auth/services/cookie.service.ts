import type { Request, Response, CookieOptions } from 'express';
import createHttpError from 'http-errors';

import { env } from '#configs/env.js';
import { REFRESH_TOKEN_EXPIRES_IN } from '#configs/constants.js';

export class CookieService {
  private readonly baseCookieOptions: CookieOptions = {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.NODE_ENV === 'production',
    maxAge: REFRESH_TOKEN_EXPIRES_IN,
  };

  set(res: Response, name: string, value: string, options: CookieOptions = {}) {
    if (!name) {
      throw createHttpError.BadRequest('Cookie name is required');
    }

    if (!res || typeof res.cookie !== 'function') {
      throw createHttpError.InternalServerError('Invalid response object');
    }

    return res.cookie(name, value, {
      ...this.baseCookieOptions,
      ...options,
    });
  }

  remove(res: Response, name: string, options: CookieOptions = {}) {
    if (!name) {
      throw createHttpError.BadRequest('Cookie name is required');
    }

    return res.clearCookie(name, {
      ...this.baseCookieOptions,
      ...options,
    });
  }

  get(req: Request, name: string) {
    if (!req.cookies) {
      throw createHttpError.InternalServerError('Cookies middleware not enabled');
    }

    const cookie = req.cookies[name];

    if (!cookie) {
      throw createHttpError.NotFound(`Cookie not found: ${name}`);
    }

    return cookie;
  }
}
