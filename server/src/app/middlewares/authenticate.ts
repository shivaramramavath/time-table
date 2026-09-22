import type { NextFunction, Request, Response } from 'express';
import { errors } from '#utils/errors.js';
import { tokenService } from '#features/auth/auth.dependency.js';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(errors.forbidden());
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return next(errors.forbidden());
  }

  try {
    const payload = tokenService.verifyAccessToken(token);
    req.userId = payload.sub;

    next();
  } catch {
    return next(errors.forbidden("You're not authorized"));
  }
};
