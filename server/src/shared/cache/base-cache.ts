import { Redis } from 'ioredis';

export abstract class BaseCache {
  protected constructor(
    protected readonly redis: Redis,
    protected readonly prefix: string,
    protected readonly defaultTtl = 300,
  ) {
    if (!prefix.trim()) {
      throw new Error('Cache prefix must not be empty');
    }

    this.validateTtl(defaultTtl);
  }

  protected buildKey(id: string): string {
    if (!id.trim()) {
      throw new Error('Cache ID must not be empty');
    }

    return `${this.prefix}:${id}`;
  }

  protected buildTtl(ttl = this.defaultTtl): number {
    this.validateTtl(ttl);

    // Add up to 10% jitter to reduce simultaneous expirations.
    const jitter = Math.floor(
      Math.random() * Math.max(1, Math.ceil(ttl * 0.1)),
    );

    return ttl + jitter;
  }

  protected validateTtl(ttl: number): void {
    if (!Number.isSafeInteger(ttl) || ttl <= 0) {
      throw new Error('TTL must be a positive integer in seconds');
    }
  }
}
