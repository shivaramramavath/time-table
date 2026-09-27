import createHttpError from 'http-errors';
import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { ZodType } from 'zod';

export const requestValidator = <T>(schema: ZodType<T>): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync(req.body);

    if (!result.success) {
      const message = result.error.issues[0]?.message ?? 'Validation failed';

      throw createHttpError.BadRequest(message);
    }

    req.body = result.data;

    next();
  };
};
