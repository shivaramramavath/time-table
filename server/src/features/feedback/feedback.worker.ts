import { UnrecoverableError, Worker, type Job } from 'bullmq';

import type { FeedbackProcessor } from './feedback.processor.js';
import type { Redis } from 'ioredis';
import logger from '#configs/logger.js';

export class FeedbackWorker {
  constructor(
    private readonly feedbackProcessor: FeedbackProcessor,
    private readonly connection: Redis,
  ) {}

  private process = async (job: Job) => {
    try {
      switch (job.name) {
        case 'create':
          await this.feedbackProcessor.create(job.data);
          break;

        default:
          throw new UnrecoverableError(`Unknown feedback job type: ${job.name}`);
      }
    } catch (error: any) {
      logger.error('Feedback job failed', {
        jobId: job.id,
        jobName: job.name,
        feedback: job.data,
        attemptsMade: job.attemptsMade,
        message: error?.message,
        stack: error?.stack,
      });

      throw error;
    }
  };

  start = () => {
    return new Worker('feedback', this.process, {
      connection: this.connection,

      concurrency: 10,

      removeOnComplete: {
        age: 0,
      },

      removeOnFail: {
        count: 100,
      },
    });
  };
}
