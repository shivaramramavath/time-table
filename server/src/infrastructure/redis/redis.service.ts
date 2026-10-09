import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly client: Redis;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: PinoLogger,
  ) {
    this.client = new Redis({
      host: this.configService.getOrThrow<string>('redis.host'),
      port: this.configService.getOrThrow<number>('redis.port'),
      lazyConnect: true,
      enableReadyCheck: true,
      maxRetriesPerRequest: 1,
      connectTimeout: 5000,
    });
  }

  async onModuleInit(): Promise<void> {
    this.client.on('error', (error) => {
      this.logger.error(`Redis connection error: ${error.message}`);
    });

    await this.client.connect();
    await this.client.ping();

    this.logger.info('Redis connected successfully');
  }

  async onModuleDestroy(): Promise<void> {
    if (this.client.status !== 'end') {
      await this.client.quit();
    }
  }

  getClient(): Redis {
    return this.client;
  }

  async ping(): Promise<string> {
    try {
      const pong = await this.client.ping();
      if (pong !== 'PONG') {
        throw new Error('Invalid Redis ping response');
      }
      return pong;
    } catch {
      throw new ServiceUnavailableException('Redis is unavailable');
    }
  }
}
