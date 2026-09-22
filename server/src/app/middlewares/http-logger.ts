import type { Request, Response } from 'express';

import morgan from 'morgan';
import logger from '#configs/logger.js';

export const httpLogger = morgan((tokens: any, req: Request, res: Response) => {
  const method = tokens.method(req, res) || '';
  if (method === 'OPTIONS') return null;

  const status = Number(tokens.status(req, res));
  const responseTime = Number(tokens['response-time'](req, res));
  const route = req.route?.path || req.path;
  const url = tokens.url(req, res) || '';
  const contentLength = tokens.res(req, res, 'content-length') || '0';

  const logMessage = `${method} ${url} ${status} ${responseTime} ms - ${contentLength}`;

  const meta = {
    method,
    url,
    route,
    status,
    responseTime,
    contentLength,
    ip: req.ip,
    userAgent: req.headers['user-agent'],
  };

  if (status >= 500) {
    logger.error(logMessage, meta);
  } else if (status >= 400) {
    logger.warn(logMessage, meta);
  } else {
    logger.info(logMessage, meta);
  }

  return null;
});
