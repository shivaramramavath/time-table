import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  ServiceUnavailableException,
} from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import Redis from 'ioredis';
import { PinoLogger } from 'nestjs-pino';
import { redisConfig } from '../../config';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly client: Redis;

  constructor(
    @Inject(redisConfig.KEY)
    private readonly config: ConfigType<typeof redisConfig>,
    private readonly logger: PinoLogger,
  ) {
    this.client = new Redis({
      host: this.config.host,
      port: this.config.port,
      lazyConnect: this.config.lazyConnect,
      enableReadyCheck: this.config.enableReadyCheck,
      maxRetriesPerRequest: this.config.maxRetriesPerRequest,
      connectTimeout: this.config.connectTimeout,
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
