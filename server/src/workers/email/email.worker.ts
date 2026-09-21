import { Job, UnrecoverableError, Worker } from 'bullmq';

import redis from '#configs/redis.js';
import logger from '#configs/logger.js';
import { EmailProcessor } from './email.processor.js';
import { brevoService } from '../../infrastructure/email/brevo.js';
import { env } from '#configs/env.js';

const emailProcessor = new EmailProcessor(brevoService, env.ORIGIN_URL, env.EMAIL_ID);

const emailJob = async (job: Job) => {
  const { email } = job.data;

  try {
    switch (job.name) {
      case 'forgot-password':
        await emailProcessor.forgotPassword(job.data);
        break;

      case 'register-greeting':
        await emailProcessor.registerGreeting(job.data);
        break;

      case 'feedback':
        await emailProcessor.feedback(job.data);
        break;

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
      message: error?.message,
      stack: error?.stack,
    });

    if ([400, 401, 403, 404].includes(status)) {
      throw new UnrecoverableError(`Permanent email failure (${status})`);
    }

    throw error;
  }
};

export const emailWorker = () =>
  new Worker('email', emailJob, {
    connection: redis,
    concurrency: 10,

    removeOnComplete: {
      age: 0,
    },

    removeOnFail: {
      count: 100,
    },
  });
