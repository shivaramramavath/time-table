import { generateMessageId } from '#utils/generate-ids.js';
import { messageCache } from './message.cache.js';
import type { Message } from './message.model.js';

export class MessageService {
  async create(data: Message): Promise<Message> {
    const message: Message = {
      ...data,
      id: data.id ?? generateMessageId(),
    };

    return messageCache.push(message);
  }

  async get(designerId: string, page = 1) {
    return messageCache.get(designerId, page);
  }
}

export const messageService = new MessageService();
