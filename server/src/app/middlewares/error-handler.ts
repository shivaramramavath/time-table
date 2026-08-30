import type { Request, Response, NextFunction } from "express";
import logger from "#configs/logger.js";
import { env } from "#configs/env.js";

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  nxt: NextFunction,
) => {
  const status = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  logger.error({
    status,
    message,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
  });

  res.status(status).json({
    success: false,
    error: true,
    message,
    ...(env.isProd && {
      stack: err.stack,
    }),
  });
};
