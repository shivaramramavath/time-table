import redis from '#configs/redis.js';

export class BaseObjectCache {
  constructor(
    protected readonly prefix: string,
    protected readonly ttl = 300,
  ) {}

  protected key(id: string): string {
    return `${this.prefix}:${id}`;
  }

  async get<T>(id: string, key: string): Promise<T | null> {
    const value = await redis.hget(this.key(id), key);

    if (!value) {
      return null;
    }

    return JSON.parse(value) as T;
  }

  async getAll<T>(id: string): Promise<T[]> {
    const values = await redis.hgetall(this.key(id));

    return Object.values(values).map((value) => JSON.parse(value) as T);
  }

  async set<T>(id: string, key: string, value: T): Promise<void> {
    const redisKey = this.key(id);

    await redis
      .multi()
      .hset(redisKey, key, JSON.stringify(value))
      .expire(redisKey, this.ttl)
      .exec();
  }

  async setMany<T>(
    id: string,
    entries: Array<{
      key: string;
      value: T;
    }>,
  ): Promise<void> {
    if (!entries.length) {
      return;
    }

    const redisKey = this.key(id);
    const pipeline = redis.multi();

    for (const entry of entries) {
      pipeline.hset(redisKey, entry.key, JSON.stringify(entry.value));
    }

    pipeline.expire(redisKey, this.ttl);

    await pipeline.exec();
  }

  async delete(id: string, key: string): Promise<void> {
    await redis.hdel(this.key(id), key);
  }

  async deleteMany(id: string, keys: string[]): Promise<number> {
    if (!keys.length) {
      return 0;
    }

    return redis.hdel(this.key(id), ...keys);
  }

  async clear(id: string): Promise<void> {
    await redis.del(this.key(id));
  }
}
