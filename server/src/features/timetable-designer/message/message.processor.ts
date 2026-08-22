import type { Job } from "bullmq";

import { messageCache } from "./message.cache.js";
import { messageRepository } from "./message.repository.js";
import type { Message } from "./message.model.js";

export interface MessageJobData {
  designerId: string;
  message: Message;
}

export const messageProcessor = {
  async create(job: Job<MessageJobData>) {
    const { designerId, message } = job.data;

    const savedMessage = await messageRepository.create(message);

    return {
      messageId: savedMessage.id,
    };
  },
};
