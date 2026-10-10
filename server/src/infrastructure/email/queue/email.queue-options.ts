import type { JobsOptions } from 'bullmq';

export const EMAIL_JOB_OPTIONS: JobsOptions = {
  attempts: 5,
  backoff: {
    type: 'exponential',
    delay: 5_000,
  },
  removeOnComplete: {
    count: 1_000,
  },
  removeOnFail: {
    count: 5_000,
  },
};
