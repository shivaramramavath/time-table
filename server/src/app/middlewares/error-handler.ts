import type { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import logger from '#configs/logger.js';
import { env } from '#configs/env.js';

export const errorHandler = (err: Error, req: Request, res: Response, _: NextFunction) => {
  const error = createError(err);

  const status = error.statusCode;
  const message = error.message;

  logger.error({
    status,
    message,
    stack: error.stack,
    path: req.originalUrl,
    method: req.method,
  });

  res.status(status).json({
    success: false,
    error: true,
    message,
    ...(env.isProd && {
      stack: error.stack,
    }),
  });
};
