import type { Params } from 'nestjs-pino';
import { randomUUID } from 'node:crypto';

export const loggerConfig: Params = {
  pinoHttp: {
    level: process.env.LOG_LEVEL ?? 'debug',

    genReqId: (req) => {
      const requestId = req.headers['x-request-id'];

      return typeof requestId === 'string' ? requestId : randomUUID();
    },

    redact: {
      paths: [
        'req.headers.authorization',
        'req.headers.cookie',
        'req.headers["set-cookie"]',
        'res.headers["set-cookie"]',
        'password',
        '*.password',
        'passwordHash',
        '*.passwordHash',
        'token',
        '*.token',
        'accessToken',
        '*.accessToken',
        'refreshToken',
        '*.refreshToken',
        'secret',
        '*.secret',
        'resetUrl',
        '*.resetUrl',
      ],
      censor: '[REDACTED]',
    },

    transport:
      process.env.NODE_ENV === 'development'
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              levelFirst: true,
              translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l',
              ignore: 'pid,hostname',
              singleLine: false,
              errorLikeObjectKeys: ['err', 'error'],
            },
          }
        : undefined,
  },
};
