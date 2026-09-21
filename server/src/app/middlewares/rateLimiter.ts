import { RateLimiterMemory, RateLimiterRedis } from 'rate-limiter-flexible';

import asyncHandler from 'express-async-handler';

import type { NextFunction, Request, Response } from 'express';

import redis from '#configs/redis.js';

import ApiError from '#utils/ApiError.js';

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
  if (req.authId) {
    return `user:${req.authId}`;
  }

  const forwardedFor = req.headers['x-forwarded-for'];

  if (typeof forwardedFor === 'string') {
    return `ip:${forwardedFor.split(',')[0].trim()}`;
  }

  return `ip:${req.ip}`;
};

export const rateLimiterMiddleware = (limiter: RateLimiterRedis) =>
  asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const key = getClientKey(req);

      await limiter.consume(key);

      next();
    } catch {
      next(new ApiError(429, 'Too many requests. Please try again later.'));
    }
  });

const createRateLimiter = (options: LimitOptions) => rateLimiterMiddleware(createLimiter(options));

export default createRateLimiter;
