import { DESIGNER_TTL, PAGE_SIZE } from "#configs/constants.js";

import redis from "#configs/redis.js";

import { Message } from "./message.model.js";
import { messageQueue } from "./message.queue.js";

const getKey = (designerId: string) => `messages:${designerId}`;

export const messageCache = {
  async push(designerId: string, message: Message) {
    const key = getKey(designerId);

    await redis.rpush(key, JSON.stringify(message));

    await redis.expire(key, DESIGNER_TTL);

     await messageQueue.add(
      designerId,
      message,
    );
  },

  async get(designerId: string, page = 1) {
    const key = getKey(designerId);

    const total = await redis.llen(key);

    if (!total) {
      return {
        messages: [],
        page,
        pageSize: PAGE_SIZE,
        hasMore: false,
      };
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

    const messages = await redis.lrange(key, start, end);

    return {
      messages: messages.map((message) => JSON.parse(message)),

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
