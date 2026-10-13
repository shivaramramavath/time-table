import type { JobsOptions } from 'bullmq';

export const EMAIL_JOB_DEFAULTS: JobsOptions = {
  attempts: 5,
  backoff: {
    type: 'exponential',
    delay: 5_000,
  },
  removeOnComplete: {
    age: 3600,
    count: 1000,
  },
  removeOnFail: {
    age: 86400,
    count: 5000,
  },
};
