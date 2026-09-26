import type { Job } from 'bullmq';

import { BaseProcess } from '#shared/Base/BaseProcess.js';

import type { Message } from './message.model.js';
import { messageRepository, MessageRepository } from './message.repository.js';

export interface MessageJobData {
  designerId: string;
  message: Message;
}

export class MessageProcess extends BaseProcess<MessageJobData> {
  constructor(private readonly repository: MessageRepository) {
    super();
  }

  async execute(job: Job<MessageJobData>): Promise<unknown> {
    switch (job.name) {
      case 'create':
        return this.create(job);

      default:
        throw new Error(`Unsupported message job: ${job.name}`);
    }
  }

  private async create(job: Job<MessageJobData>) {
    const { message } = job.data;

    const savedMessage = await this.repository.create(message);

    return {
      messageId: savedMessage?.id ?? message.id,
    };
  }
}

export const messageProcessor = new MessageProcess(messageRepository);
