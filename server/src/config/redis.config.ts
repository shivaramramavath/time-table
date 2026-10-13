import { registerAs } from '@nestjs/config';

export const redisConfig = registerAs('redis', () => ({
  host: process.env.REDIS_HOST ?? 'localhost',
  port: Number(process.env.REDIS_PORT ?? 6379),
  lazyConnect: true,
  enableReadyCheck: true,
  maxRetriesPerRequest: 1,
  connectTimeout: 5000,
}));
