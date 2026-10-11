import { Logger } from '@nestjs/common';
import { Redis } from 'ioredis';
import { BaseCache } from './base-cache';

export abstract class BaseCacheObject extends BaseCache {
  protected readonly logger = new Logger(this.constructor.name);

  protected constructor(
    protected readonly redis: Redis,
    protected readonly prefix: string,
    protected readonly defaultTtl = 300,
  ) {
    super(redis, prefix, defaultTtl);
  }

  private serializeFields(
    data: Record<string, unknown>,
  ): Record<string, string> {
    const fields: Record<string, string> = {};

    for (const [field, value] of Object.entries(data)) {
      if (value === undefined) continue;

      const serialized = JSON.stringify(value);

      if (serialized === undefined) {
        throw new Error(`Field "${field}" cannot be serialized`);
      }

      fields[field] = serialized;
    }

    return fields;
  }

  private deserializeFields(
    fields: Record<string, string>,
  ): Record<string, unknown> {
    return Object.fromEntries(
      Object.entries(fields).map(([field, value]) => [
        field,
        JSON.parse(value) as unknown,
      ]),
    );
  }

  async setObject<T extends Record<string, unknown>>(
    id: string,
    data: T,
    ttl = this.defaultTtl,
  ): Promise<void> {
    const key = this.buildKey(id);
    const fields = this.serializeFields(data);
    const effectiveTtl = this.buildTtl(ttl);

    try {
      const multi = this.redis.multi();

      multi.del(key);

      if (Object.keys(fields).length > 0) {
        multi.hset(key, fields);
        multi.expire(key, effectiveTtl);
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

      return this.deserializeFields(result) as T;
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
      const key = this.buildKey(id);
      const serialized = this.serializeFields(fields);

      if (Object.keys(serialized).length === 0) return;

      // Do not silently create a hash without an expiration.
      const multi = this.redis.multi();

      multi.hset(key, serialized);
      multi.expire(key, this.buildTtl());

      const results = await multi.exec();

      if (!results || results.some(([error]) => error !== null)) {
        throw new Error('Redis transaction failed to update fields');
      }
    } catch (error) {
      this.logger.error(
        'Failed to update cached object fields',
        error instanceof Error ? error.stack : undefined,
      );
      throw error;
    }
  }

  async setField(id: string, field: string, value: unknown): Promise<void> {
    try {
      const key = this.buildKey(id);
      const serialized = this.serializeFields({ [field]: value });

      if (!(field in serialized)) return;

      const multi = this.redis.multi();

      multi.hset(key, field, serialized[field]);
      multi.expire(key, this.buildTtl());

      const results = await multi.exec();

      if (!results || results.some(([error]) => error !== null)) {
        throw new Error('Redis transaction failed to set field');
      }
    } catch (error) {
      this.logger.error(
        'Failed to update cached object field',
        error instanceof Error ? error.stack : undefined,
      );
      throw error;
    }
  }

  async deleteField(id: string, field: string): Promise<void> {
    try {
      await this.redis.hdel(this.buildKey(id), field);
    } catch (error) {
      this.logger.error(
        'Failed to delete cached object field',
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
