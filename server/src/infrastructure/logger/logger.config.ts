import type { Params } from 'nestjs-pino';
import { randomUUID } from 'node:crypto';

const enabled = (process.env.LOG_ENABLED ?? 'true') === 'true';
const isProduction = process.env.NODE_ENV === 'production';

export const loggerConfig: Params = {
  pinoHttp: {
    enabled,
    level: process.env.LOG_LEVEL ?? 'info',

    genReqId: (req) => {
      const requestId = req.headers['x-request-id'];

      return typeof requestId === 'string' ? requestId : randomUUID();
    },

    // Log only the fields needed for request monitoring.
    serializers: {
      req: (req: any) => ({
        id: req.id,
        method: req.method,
        url: req.url,
      }),
      res: (res) => ({
        statusCode: res.statusCode,
      }),
    },

    customSuccessMessage: (req, res) =>
      `${req.method} ${req.url} ${res.statusCode}`,

    customErrorMessage: (req, res) =>
      `${req.method} ${req.url} ${res.statusCode}`,

    redact: {
      paths: [
        'req.headers.authorization',
        'req.headers.cookie',
        'req.headers.set-cookie',
        'res.headers.set-cookie',
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
      !isProduction && enabled
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              levelFirst: true,
              translateTime: 'SYS:standard',
              ignore: 'pid,hostname',
              singleLine: true,
            },
          }
        : undefined,
  },
};
