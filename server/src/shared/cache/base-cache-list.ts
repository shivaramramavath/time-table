import { Logger } from '@nestjs/common';
import { Redis } from 'ioredis';

export interface CacheListOptions {
  ttl?: number;
}

export abstract class BaseCacheList<T> {
  protected readonly logger = new Logger(this.constructor.name);

  protected constructor(
    protected readonly redis: Redis,
    protected readonly prefix: string,
    protected readonly defaultTtl = 300,
  ) {}

  protected buildKey(key: string): string {
    return `${this.prefix}:${key}`;
  }

  async getList(key: string): Promise<T[] | null> {
    try {
      const value = await this.redis.get(this.buildKey(key));

      return value === null ? null : (JSON.parse(value) as T[]);
    } catch (error) {
      this.handleError('getList', error);
    }
  }

  async setList(
    key: string,
    items: T[],
    options: CacheListOptions = {},
  ): Promise<void> {
    const ttl = options.ttl ?? this.defaultTtl;

    if (!Number.isInteger(ttl) || ttl <= 0) {
      throw new Error('Cache TTL must be a positive integer in seconds');
    }

    try {
      await this.redis.set(
        this.buildKey(key),
        JSON.stringify(items),
        'EX',
        ttl,
      );
    } catch (error) {
      this.handleError('setList', error);
    }
  }

  async deleteList(key: string): Promise<boolean> {
    try {
      return (await this.redis.del(this.buildKey(key))) > 0;
    } catch (error) {
      this.handleError('deleteList', error);
    }
  }

  async getOrSetList(
    key: string,
    factory: () => Promise<T[]>,
    options: CacheListOptions = {},
  ): Promise<T[]> {
    const cached = await this.getList(key);

    if (cached !== null) {
      return cached;
    }

    const items = await factory();
    await this.setList(key, items, options);

    return items;
  }

  protected handleError(operation: string, error: unknown): never {
    this.logger.error(
      `${operation} failed`,
      error instanceof Error ? error.stack : undefined,
    );

    throw error;
  }
}
