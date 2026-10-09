import type { Params } from 'nestjs-pino';

export const loggerConfig: Params = {
  pinoHttp: {
    level: process.env.LOG_LEVEL ?? 'info',

    genReqId: (req) => {
      const requestId = req.headers['x-request-id'];

      if (typeof requestId === 'string') {
        return requestId;
      }

      return crypto.randomUUID();
    },

    redact: {
      paths: [
        'req.headers.authorization',
        'req.headers.cookie',
        'res.headers["set-cookie"]',
        'password',
        '*.password',
        'token',
        'accessToken',
        'refreshToken',
      ],
      censor: '[REDACTED]',
    },

    transport:
      process.env.NODE_ENV === 'development'
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              singleLine: true,
              translateTime: 'yyyy-mm-dd HH:MM:ss.l',
            },
          }
        : undefined,
  },
};
