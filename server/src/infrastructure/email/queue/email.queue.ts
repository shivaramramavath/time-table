import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

import type { SendEmailOptions } from '../email.types';

export const EMAIL_QUEUE = 'email';
export const EMAIL_JOB_SEND = 'email.send';

@Injectable()
export class EmailQueue {
  constructor(
    @InjectQueue(EMAIL_QUEUE)
    private readonly queue: Queue,
  ) {}

  async send(options: SendEmailOptions) {
    return this.queue.add(EMAIL_JOB_SEND, options, {
      attempts: 5,

      backoff: {
        type: 'exponential',
        delay: 5_000,
      },

      removeOnComplete: {
        count: 1000,
      },

      removeOnFail: {
        count: 5000,
      },
    });
  }
}
