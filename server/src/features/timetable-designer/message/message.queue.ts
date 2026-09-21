import { Queue } from 'bullmq';

import redis from '#configs/redis.js';
import type { Message } from './message.model.js';

const queue = new Queue('message', {
  connection: redis,

  defaultJobOptions: {
    attempts: 3,

    backoff: {
      type: 'exponential',
      delay: 1000,
    },

    removeOnComplete: 100,
    removeOnFail: 500,
  },
});

export const messageQueue = {
  add: async (designerId: string, message: Message) => {
    return queue.add(
      'create',
      {
        designerId,
        message,
      },
      {
        jobId: `message:${message.id}`,
      },
    );
  },
};
