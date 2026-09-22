import type { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { tokenService } from '#features/auth/auth.dependency.js';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(createError.Forbidden("You're not authorized"));
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return next(createError.Forbidden("You're not authorized"));
  }

  try {
    const payload = await tokenService.verifyAccessToken(token);
    req.userId = payload.sub;

    next();
  } catch {
    return next(createError.Forbidden("You're not authorized"));
  }
};
