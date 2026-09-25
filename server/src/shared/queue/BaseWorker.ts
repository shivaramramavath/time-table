import { Worker, type Job, type Processor } from 'bullmq';

import redis from '#configs/redis.js';

export abstract class BaseWorker<T = unknown> {
  protected readonly worker: Worker;

  constructor(
    protected readonly queueName: string,
    concurrency = 5,
  ) {
    this.worker = new Worker(queueName, this.createProcessor(), {
      connection: redis,
      concurrency,
    });

    this.registerEvents();
  }

  protected abstract process(job: Job<T>): Promise<unknown>;

  private createProcessor(): Processor<T> {
    return async (job) => {
      return this.process(job);
    };
  }

  private registerEvents() {
    this.worker.on('completed', (job) => {
      console.log(`Job completed: ${this.queueName}:${job.id}`);
    });

    this.worker.on('failed', (job, error) => {
      console.error(`Job failed: ${this.queueName}:${job?.id}`, error);
    });

    this.worker.on('error', (error) => {
      console.error(`Worker error: ${this.queueName}`, error);
    });
  }

  async close() {
    await this.worker.close();
  }
}
