import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  port: process.env.PORT ?? 8080,
  logLevel: process.env.LOG_LEVEL ?? 'debug',
  nodeEnv: process.env.NODE_ENV ?? 'development',
  originUrl: process.env.ORIGIN_URL ?? 'http://localhost:3000',
}));
