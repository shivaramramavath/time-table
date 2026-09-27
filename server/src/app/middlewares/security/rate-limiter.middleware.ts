import { RateLimiterMemory, RateLimiterRedis } from 'rate-limiter-flexible';
import createError from 'http-errors';

import asyncHandler from 'express-async-handler';

import type { NextFunction, Request, Response } from 'express';

import redis from '#configs/redis.js';

interface LimitOptions {
  keyPrefix: string;
  points: number;
  duration: number;
  blockDuration: number;
}

const insuranceLimiter = new RateLimiterMemory({
  points: 50,
  duration: 1,
});

export const createLimiter = (options: LimitOptions) =>
  new RateLimiterRedis({
    storeClient: redis,
    insuranceLimiter,
    execEvenly: false,
    ...options,
  });

const getClientKey = (req: Request) => {
  if (req.userId) {
    return `user:${req.userId}:ip:${req.ip}`;
  }

  return `ip:${req.ip}`;
};

export const rateLimiterMiddleware = (limiter: RateLimiterRedis) =>
  asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await limiter.consume(getClientKey(req));
      next();
    } catch {
      next(createError.TooManyRequests('You have exceeded the rate limit'));
    }
  });

const createRateLimiter = (options: LimitOptions) => rateLimiterMiddleware(createLimiter(options));

export default createRateLimiter;
