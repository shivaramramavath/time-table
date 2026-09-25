import redis from '#configs/redis.js';

export class BaseCache {
  constructor(
    private readonly prefix: string,
    private readonly ttl = 300,
  ) {}

  private key(id: string) {
    return `${this.prefix}:${id}`;
  }

  async get<T>(id: string): Promise<T | null> {
    const value = await redis.get(this.key(id));

    if (!value) {
      return null;
    }

    return JSON.parse(value) as T;
  }

  async set<T>(id: string, value: T) {
    await redis.set(this.key(id), JSON.stringify(value), 'EX', this.ttl);
  }

  async delete(id: string) {
    await redis.del(this.key(id));
  }

  async exists(id: string) {
    return redis.exists(this.key(id));
  }

  async clear(ids: string[]) {
    if (!ids.length) {
      return;
    }

    await redis.del(...ids.map((id) => this.key(id)));
  }
}
