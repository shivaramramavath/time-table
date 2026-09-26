import { UnrecoverableError, type Job } from 'bullmq';
import type { EmailJobData } from './email.queue.js';

import { BaseProcess } from '#shared/Base/BaseProcess.js';
import logger from '#configs/logger.js';
import { EmailProcessor } from './email.processor.js';

export class EmailProcess extends BaseProcess<EmailJobData> {
  constructor(private readonly emailProcessor: EmailProcessor) {
    super();
  }

  async execute(job: Job<EmailJobData>): Promise<unknown> {
    const { email } = job.data;

    try {
      switch (job.name) {
        case 'forgot-password':
          return await this.emailProcessor.forgotPassword(job.data);

        case 'register-greeting':
          return await this.emailProcessor.registerGreeting(job.data);

        case 'feedback':
          return await this.emailProcessor.feedback(job.data);

        default:
          throw new UnrecoverableError(`Unknown email job type: ${job.name}`);
      }
    } catch (error: any) {
      const status = error?.response?.status;

      logger.error('Email job failed', {
        jobId: job.id,
        jobName: job.name,
        email,
        status,
        attemptsMade: job.attemptsMade,
        error,
      });

      if ([400, 401, 403, 404].includes(status)) {
        throw new UnrecoverableError(`Permanent email failure (${status})`);
      }

      throw error;
    }
  }
}
