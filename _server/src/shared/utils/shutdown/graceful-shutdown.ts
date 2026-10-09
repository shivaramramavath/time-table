import type { Server } from 'http';

import logger from '#configs/logger.js';

import type { WorkerManager } from '../../../app/worker.js';
import type { Database } from '../../../infrastructure/database/mongodb.js';
import type { RedisClient } from '../../../infrastructure/cache/redis/redis.client.js';

export class GracefulShutdown {
  private isShuttingDown = false;

  constructor(
    private readonly server: Server,
    private readonly workerManager: WorkerManager,
    private readonly redisClient: RedisClient,
    private readonly database: Database,
  ) {}

  async shutdown(signal: string): Promise<void> {
    if (this.isShuttingDown) {
      return;
    }

    this.isShuttingDown = true;

    logger.info(`${signal} received. Shutting down...`);

    try {
      await this.closeServer();

      await this.closeWorkers();

      await this.closeRedis();

      await this.closeDatabase();

      logger.info('Graceful shutdown completed');

      process.exit(0);
    } catch (error) {
      logger.error('Graceful shutdown failed', error);

      process.exit(1);
    }
  }

  private async closeServer(): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      this.server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });

    logger.info('HTTP server closed');
  }

  private async closeWorkers(): Promise<void> {
    await this.workerManager.close();

    logger.info('Workers closed');
  }

  private async closeRedis(): Promise<void> {
    await this.redisClient.disconnect();

    logger.info('Redis disconnected');
  }

  private async closeDatabase(): Promise<void> {
    await this.database.disconnect();

    logger.info('MongoDB disconnected');
  }
}
