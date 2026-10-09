import type { Server } from 'http';

import logger from '#configs/logger.js';

import { workerManager } from '../../../app/worker.js';
import { database } from '../../../infrastructure/database/mongodb.js';
import { redisClient } from '../../../infrastructure/cache/redis/redis.client.js';

import { GracefulShutdown } from './graceful-shutdown.js';

export const registerShutdownHandlers = (server: Server): GracefulShutdown => {
  const shutdown = new GracefulShutdown(server, workerManager, redisClient, database);

  process.once('SIGINT', () => {
    void shutdown.shutdown('SIGINT');
  });

  process.once('SIGTERM', () => {
    void shutdown.shutdown('SIGTERM');
  });

  process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Promise Rejection', reason);
  });

  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception', error);

    void shutdown.shutdown('uncaughtException');
  });

  return shutdown;
};
