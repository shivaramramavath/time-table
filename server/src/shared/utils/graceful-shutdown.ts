import type { Server } from 'http';

import logger from '#configs/logger.js';
import { disconnectRedis } from '#configs/redis.js';

import { worker } from '../../worker.js';
import { database } from '../../infrastructure/database/mongodb.js';

let isShuttingDown = false;

export const gracefulShutdown = async (signal: string, server: Server) => {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;

  logger.info(`${signal} received. Shutting down...`);

  try {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });

    logger.info('HTTP server closed');

    await worker.close();

    logger.info('Workers closed');

    await disconnectRedis();

    logger.info('Redis disconnected');

    await database.disconnect();

    logger.info('MongoDB disconnected');

    logger.info('Graceful shutdown completed');

    process.exit(0);
  } catch (error) {
    logger.error('Graceful shutdown failed', error);

    process.exit(1);
  }
};

export const registerShutdownHandlers = (server: Server) => {
  process.on('SIGINT', () => {
    gracefulShutdown('SIGINT', server);
  });

  process.on('SIGTERM', () => {
    gracefulShutdown('SIGTERM', server);
  });

  process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Promise Rejection', reason);
  });

  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception', error);

    process.exit(1);
  });
};
