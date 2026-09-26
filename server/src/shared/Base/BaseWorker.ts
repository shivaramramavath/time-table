import { Worker, type Job, type Processor } from 'bullmq';

import redis from '#configs/redis.js';
import type { BaseProcess } from '../Base/BaseProcess.js';
import logger from '#configs/logger.js';

export abstract class BaseWorker<T> {
  protected readonly worker: Worker<T>;

  constructor(
    protected readonly queueName: string,
    protected readonly process: BaseProcess<T>,
    concurrency = 5,
  ) {
    this.worker = new Worker<T>(queueName, this.createProcessor(), {
      connection: redis,
      concurrency,
    });

    this.registerEvents();
  }

  private createProcessor(): Processor<T> {
    return async (job: Job<T>) => {
      return this.process.execute(job);
    };
  }

  private registerEvents(): void {
    this.worker.on('completed', (job) => {
      logger.info(`Job completed: ${this.queueName}:${job.id}`);
    });

    this.worker.on('failed', (job, error) => {
      logger.error(`Job failed: ${this.queueName}:${job?.id}`, error);
    });

    this.worker.on('error', (error) => {
      logger.error(`Worker error: ${this.queueName}`, error);
    });

    this.worker.on('ready', () => {
      logger.info(`Worker ready: ${this.queueName}`);
    });
  }

  async close(): Promise<void> {
    await this.worker.close();
  }
}
