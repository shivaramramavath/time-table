import { Queue, type JobsOptions } from 'bullmq';

import redis from '#configs/redis.js';

export abstract class BaseQueue<T> {
  protected readonly queue: Queue<T>;

  constructor(protected readonly queueName: string) {
    this.queue = new Queue<T>(queueName, {
      connection: redis,
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
        removeOnComplete: 100,
        removeOnFail: 100,
      },
    });
  }

  async add(name: string, data: T, options?: JobsOptions) {
    return this.queue.add(name, data, options);
  }

  async addBulk(
    jobs: Array<{
      name: string;
      data: T;
      opts?: JobsOptions;
    }>,
  ) {
    return this.queue.addBulk(jobs);
  }

  async close(): Promise<void> {
    await this.queue.close();
  }
}
