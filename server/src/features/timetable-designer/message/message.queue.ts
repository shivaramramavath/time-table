import type { JobsOptions } from 'bullmq';

import { BaseQueue } from '#shared/Base/BaseQueue.js';

import type { Message } from './message.model.js';

export interface MessageJob {
  designerId: string;
  message: Message;
}

export class MessageQueue extends BaseQueue<MessageJob> {
  constructor() {
    super('message');
  }

  async add(designerId: string, message: Message) {
    return super.add(
      'create',
      {
        designerId,
        message,
      },
      {
        jobId: `message:${message.id}`,
      },
    );
  }
}

export const messageQueue = new MessageQueue();
