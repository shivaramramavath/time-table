import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  port: Number(process.env.PORT ?? 8080),
  logLevel: process.env.LOG_LEVEL ?? 'info',
  logEnabled: (process.env.LOG_ENABLED ?? 'true') === 'true',
  nodeEnv: process.env.NODE_ENV ?? 'development',
  originUrl: process.env.ORIGIN_URL ?? 'http://localhost:3000',
}));
