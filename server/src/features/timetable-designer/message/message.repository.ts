import { PAGE_SIZE } from '#configs/constants.js';
import { BaseRepository } from '#shared/Base/BaseRepository.js';

import { MessageModel, type Message } from './message.model.js';

export class MessageRepository extends BaseRepository<Message> {
  constructor() {
    super(MessageModel);
  }

  findAll(designerId: string, page = 1) {
    const filter = { designerId };
    return this.model
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .exec();
  }
}

export const messageRepository = new MessageRepository();
