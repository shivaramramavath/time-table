import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisService } from './redis.service';

@Injectable()
export class RedisDataService {
  private readonly client: Redis;

  constructor(redisService: RedisService) {
    this.client = redisService.getClient();
  }

  // String operations

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  async setWithExpiry(
    key: string,
    value: string,
    ttlSeconds: number,
  ): Promise<void> {
    this.validateTtl(ttlSeconds);
    await this.client.set(key, value, 'EX', ttlSeconds);
  }

  async delete(key: string): Promise<number> {
    return this.client.del(key);
  }

  async exists(key: string): Promise<boolean> {
    return (await this.client.exists(key)) === 1;
  }

  async expire(key: string, ttlSeconds: number): Promise<boolean> {
    this.validateTtl(ttlSeconds);
    return (await this.client.expire(key, ttlSeconds)) === 1;
  }

  async ttl(key: string): Promise<number> {
    return this.client.ttl(key);
  }

  // Set operations

  async addToSet(key: string, ...members: string[]): Promise<number> {
    if (members.length === 0) return 0;
    return this.client.sadd(key, ...members);
  }

  async removeFromSet(key: string, ...members: string[]): Promise<number> {
    if (members.length === 0) return 0;
    return this.client.srem(key, ...members);
  }

  async getSetMembers(key: string): Promise<string[]> {
    return this.client.smembers(key);
  }

  async isSetMember(key: string, member: string): Promise<boolean> {
    return (await this.client.sismember(key, member)) === 1;
  }

  async deleteMany(...keys: string[]): Promise<number> {
    if (keys.length === 0) return 0;
    return this.client.del(...keys);
  }

  private validateTtl(ttlSeconds: number): void {
    if (!Number.isSafeInteger(ttlSeconds) || ttlSeconds <= 0) {
      throw new Error('TTL must be a positive integer');
    }
  }
}
