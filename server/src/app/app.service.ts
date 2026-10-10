import { Injectable } from '@nestjs/common';
import os from 'node:os';
import { RedisService } from '../infrastructure/redis/redis.service';

@Injectable()
export class AppService {
  constructor(private readonly redisService: RedisService) {}

  getHello(): string {
    return 'server running..';
  }

  getHealth() {
    const startedAt = Date.now();
    const redisHealth = this.redisService.ping();

    return {
      status: 'ok',

      timestamp: new Date().toISOString(),

      uptime: {
        seconds: Math.floor(process.uptime()),
      },

      responseTime: `${Date.now() - startedAt}ms`,

      redis: {
        status: redisHealth,
      },

      server: {
        platform: process.platform,
        architecture: process.arch,
        nodeVersion: process.version,
        hostname: os.hostname(),

        cpu: {
          cores: os.cpus().length,
          usage: process.cpuUsage(),
          loadAverage: os.loadavg(),
        },

        memory: {
          process: process.memoryUsage(),

          system: {
            total: os.totalmem(),
            free: os.freemem(),
            used: os.totalmem() - os.freemem(),
          },
        },
      },
    };
  }
}
