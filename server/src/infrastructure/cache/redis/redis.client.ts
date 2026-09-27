import { Redis } from 'ioredis';
import logger from '#configs/logger.js';
import { redisConfig } from '#configs/redis.config.js';

export class RedisClient {
  public readonly client: Redis;

  constructor() {
    this.client = new Redis(redisConfig);

    this.registerEvents();
  }

  private registerEvents(): void {
    this.client.on('error', (error: Error) => {
      logger.error('Redis error', error);
    });

    this.client.on('end', () => {
      logger.warn('Redis connection closed');
    });

    this.client.on('connect', () => {
      logger.info('Redis connection established');
    });

    this.client.on('ready', () => {
      logger.info('Redis connection ready');
    });
  }

  async ping(): Promise<string> {
    const pong = await this.client.ping();

    if (pong !== 'PONG') {
      throw new Error('Invalid Redis ping response');
    }

    return pong;
  }

  async checkHealth(): Promise<void> {
    try {
      await this.ping();

      logger.info('Redis health check successful');
    } catch (error) {
      logger.error('Redis health check failed', error);

      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.client.status === 'end' || this.client.status === 'close') {
      return;
    }

    await this.client.quit();
  }
}

export const redisClient = new RedisClient();

export const redis = redisClient.client;
