import { Logger } from '@nestjs/common';
import { Redis } from 'ioredis';
import { BaseCache } from './base-cache';

export abstract class BaseCacheList<T> extends BaseCache {
  protected readonly logger = new Logger(this.constructor.name);

  protected constructor(
    protected readonly redis: Redis,
    protected readonly prefix: string,
    protected readonly defaultTtl = 300,
  ) {
    super(redis, prefix, defaultTtl);
  }

  async getList(key: string): Promise<T[] | null> {
    try {
      const value = await this.redis.get(this.buildKey(key));

      return value === null ? null : (JSON.parse(value) as T[]);
    } catch (error) {
      this.handleError('getList', error);
    }
  }

  async setList(key: string, items: T[]): Promise<void> {
    try {
      const value = JSON.stringify(items);

      if (value === undefined) {
        throw new Error('List cannot be serialized');
      }

      await this.redis.set(this.buildKey(key), value, 'EX', this.buildTtl());
    } catch (error) {
      this.handleError('setList', error);
    }
  }

  async addToList(key: string, item: T): Promise<void> {
    try {
      const items = (await this.getList(key)) ?? [];

      items.push(item);

      await this.setList(key, items);
    } catch (error) {
      this.handleError('addToList', error);
    }
  }

  async removeFromList(
    key: string,
    predicate: (item: T) => boolean,
  ): Promise<boolean> {
    try {
      const items = await this.getList(key);

      if (items === null) return false;

      const filteredItems = items.filter((item) => !predicate(item));

      if (filteredItems.length === items.length) {
        return false;
      }

      await this.setList(key, filteredItems);

      return true;
    } catch (error) {
      this.handleError('removeFromList', error);
    }
  }

  async updateInList(
    key: string,
    predicate: (item: T) => boolean,
    update: Partial<T>,
  ): Promise<boolean> {
    try {
      const items = await this.getList(key);

      if (items === null) return false;

      const index = items.findIndex(predicate);

      if (index === -1) return false;

      items[index] = {
        ...items[index],
        ...update,
      };

      await this.setList(key, items);

      return true;
    } catch (error) {
      this.handleError('updateInList', error);
    }
  }

  async deleteList(key: string): Promise<boolean> {
    try {
      return (await this.redis.del(this.buildKey(key))) > 0;
    } catch (error) {
      this.handleError('deleteList', error);
    }
  }

  async getOrSetList(key: string, factory: () => Promise<T[]>): Promise<T[]> {
    const cached = await this.getList(key);

    if (cached !== null) {
      return cached;
    }

    const items = await factory();

    await this.setList(key, items);

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
