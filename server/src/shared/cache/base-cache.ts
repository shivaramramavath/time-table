import { Logger } from '@nestjs/common';
import { Redis } from 'ioredis';

export abstract class BaseCache {
  protected readonly logger = new Logger(this.constructor.name);

  protected constructor(
    protected readonly redis: Redis,
    protected readonly prefix: string,
    protected readonly defaultTtl = 300,
  ) {}

  protected buildKey(id: string): string {
    return `${this.prefix}:${id}`;
  }

  async setObject<T extends Record<string, unknown>>(
    id: string,
    data: T,
    ttl = this.defaultTtl,
  ): Promise<void> {
    const key = this.buildKey(id);

    try {
      if (!Number.isInteger(ttl) || ttl <= 0) {
        throw new Error('TTL must be a positive integer in seconds');
      }

      const fields: Record<string, string> = {};

      for (const [field, value] of Object.entries(data)) {
        if (value !== undefined) {
          fields[field] = value === null ? 'null' : JSON.stringify(value);
        }
      }

      const multi = this.redis.multi();

      multi.del(key);

      if (Object.keys(fields).length > 0) {
        multi.hset(key, fields);
        multi.expire(key, ttl);
      }

      const results = await multi.exec();

      if (!results || results.some(([error]) => error !== null)) {
        throw new Error('Redis transaction failed to cache object');
      }
    } catch (error) {
      this.logger.error(
        'Failed to cache object',
        error instanceof Error ? error.stack : undefined,
      );
      throw error;
    }
  }

  async getObject<T>(id: string): Promise<T | null> {
    try {
      const result = await this.redis.hgetall(this.buildKey(id));

      if (Object.keys(result).length === 0) {
        return null;
      }

      const data: Record<string, unknown> = {};

      for (const [field, value] of Object.entries(result)) {
        data[field] = JSON.parse(value);
      }

      return data as T;
    } catch (error) {
      this.logger.error(
        'Failed to retrieve cached object',
        error instanceof Error ? error.stack : undefined,
      );
      throw error;
    }
  }

  async updateFields(
    id: string,
    fields: Record<string, unknown>,
  ): Promise<void> {
    try {
      const serialized: Record<string, string> = {};

      for (const [field, value] of Object.entries(fields)) {
        if (value !== undefined) {
          serialized[field] = value === null ? 'null' : JSON.stringify(value);
        }
      }

      if (Object.keys(serialized).length === 0) return;

      await this.redis.hset(this.buildKey(id), serialized);
    } catch (error) {
      this.logger.error(
        'Failed to update cached object fields',
        error instanceof Error ? error.stack : undefined,
      );
      throw error;
    }
  }

  async deleteObject(id: string): Promise<boolean> {
    try {
      return (await this.redis.del(this.buildKey(id))) > 0;
    } catch (error) {
      this.logger.error(
        'Failed to delete cached object',
        error instanceof Error ? error.stack : undefined,
      );
      throw error;
    }
  }
}
