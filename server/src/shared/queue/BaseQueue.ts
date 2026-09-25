import { Queue, type JobsOptions } from 'bullmq';

import redis from '#configs/redis.js';

export class BaseQueue {
  protected readonly queue: Queue;

  constructor(protected readonly queueName: string) {
    this.queue = new Queue(queueName, {
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

  async add<T>(name: string, data: T, options?: JobsOptions) {
    return this.queue.add(name, data, options);
  }

  async addBulk<T>(
    jobs: Array<{
      name: string;
      data: T;
      opts?: JobsOptions;
    }>,
  ) {
    return this.queue.addBulk(jobs);
  }

  async close() {
    await this.queue.close();
  }
}
