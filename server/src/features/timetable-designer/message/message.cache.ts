import { DESIGNER_TTL, PAGE_SIZE } from '#configs/constants.js';

import redis from '#configs/redis.js';

import type { Message } from './message.model.js';
import { messageQueue } from './message.queue.js';
import { messageRepository } from './message.repository.js';

const getKey = (designerId: string) => `designer:${designerId}:messages`;

export const messageCache = {
  async push(message: Message) {
    const key = getKey(message.designerId);

    await redis.multi().rpush(key, JSON.stringify(message)).expire(key, DESIGNER_TTL).exec();

    await messageQueue.add(message.designerId, message);

    return message;
  },

  async get(designerId: string, page = 1) {
    const key = getKey(designerId);

    let total = await redis.llen(key);

    if (total === 0) {
      const messages = await messageRepository.findAll(designerId);

      if (messages.length === 0) {
        return {
          messages: [],
          page,
          pageSize: PAGE_SIZE,
          hasMore: false,
        };
      }

      await redis
        .multi()
        .rpush(key, ...messages.map((message) => JSON.stringify(message)))
        .expire(key, DESIGNER_TTL)
        .exec();

      total = messages.length;
    }

    const end = total - (page - 1) * PAGE_SIZE - 1;

    if (end < 0) {
      return {
        messages: [],
        page,
        pageSize: PAGE_SIZE,
        hasMore: false,
      };
    }

    const start = Math.max(0, end - PAGE_SIZE + 1);

    const values = await redis.lrange(key, start, end);

    return {
      messages: values.map((value) => JSON.parse(value) as Message),
      page,
      pageSize: PAGE_SIZE,
      hasMore: start > 0,
    };
  },

  async clear(designerId: string) {
    await redis.del(getKey(designerId));
  },

  async exists(designerId: string) {
    return (await redis.exists(getKey(designerId))) === 1;
  },
};
