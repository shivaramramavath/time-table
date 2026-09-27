import redis from '#configs/redis.js';

export class BaseCache {
  constructor(
    protected readonly prefix: string,
    protected readonly ttl = 300,
  ) {}

  protected key(id: string): string {
    return `${this.prefix}:${id}`;
  }

  async get<T>(id: string): Promise<T | null> {
    const value = await redis.get(this.key(id));

    if (!value) {
      return null;
    }

    return JSON.parse(value) as T;
  }

  async set<T>(id: string, value: T): Promise<void> {
    await redis.set(this.key(id), JSON.stringify(value), 'EX', this.ttl);
  }

  async delete(id: string): Promise<void> {
    await redis.del(this.key(id));
  }

  async exists(id: string): Promise<boolean> {
    return Boolean(await redis.exists(this.key(id)));
  }

  async clear(ids: string[]): Promise<void> {
    if (!ids.length) {
      return;
    }

    await redis.del(...ids.map((id) => this.key(id)));
  }
}
