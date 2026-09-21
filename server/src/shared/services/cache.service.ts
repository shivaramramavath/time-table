import redis from '#configs/redis.js';
import type { Queue } from 'bullmq';

import { DEFAULT_TTL } from '#utils/const.js';

interface CacheOptions {
  ttl?: number;
}

interface WriteThroughOptions {
  ttl?: number;
  jobName: string;
  queue: Queue;
  jobOptions?: object;
}

const serialize = (data: unknown) => JSON.stringify(data);

const deserialize = (data: string) => {
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

const cache = async (
  key: string,
  callback: () => Promise<unknown>,
  options: CacheOptions = {},
): Promise<unknown> => {
  const { ttl = DEFAULT_TTL } = options;

  const cached = await redis.get(key);

  if (cached) {
    return deserialize(cached);
  }

  const data = await callback();

  if (data !== null && data !== undefined) {
    await redis.set(key, serialize(data), 'EX', ttl);
  }

  return data;
};

const writeThroughCache = async (key: string, data: unknown, options: WriteThroughOptions) => {
  const { ttl = DEFAULT_TTL, queue, jobName, jobOptions = {} } = options;

  await redis.set(key, serialize(data), 'EX', ttl);

  await queue.add(jobName, data, jobOptions);

  return data;
};

const updateCache = async (
  key: string,
  updatedData: Record<string, unknown>,
  options: WriteThroughOptions,
) => {
  const { ttl = DEFAULT_TTL, queue, jobName, jobOptions = {} } = options;

  const cached = await redis.get(key);

  const parsed = cached ? deserialize(cached) : {};

  const data = {
    ...parsed,
    ...updatedData,
  };

  await redis.set(key, serialize(data), 'EX', ttl);

  await queue.add(jobName, data, jobOptions);

  return data;
};

const deleteCache = async (key: string, deleteId: string, options: WriteThroughOptions) => {
  const { queue, jobName, jobOptions = {} } = options;

  const cached = await redis.get(key);

  const data = cached ? deserialize(cached) : null;

  await redis.del(key);

  await queue.add(jobName, { deleteId }, jobOptions);

  return data;
};

export default {
  cache,
  writeThroughCache,
  updateCache,
  deleteCache,
};
