import os from 'node:os';
import type { Request, Response } from 'express';

import { redis } from '#infrastructure/cache/redis/redis.client.js';

export const health = async (_req: Request, res: Response) => {
  const startedAt = Date.now();

  let redisHealth: {
    status: 'up' | 'down';
    latency?: number;
    error?: string;
  };

  try {
    const redisStart = Date.now();

    await redis.ping();

    redisHealth = {
      status: 'up',
      latency: Date.now() - redisStart,
    };
  } catch (error) {
    redisHealth = {
      status: 'down',
      error: error instanceof Error ? error.message : 'Redis connection failed',
    };
  }

  const isHealthy = redisHealth.status === 'up';

  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? 'ok' : 'degraded',

    timestamp: new Date().toISOString(),

    uptime: {
      seconds: Math.floor(process.uptime()),
    },

    responseTime: `${Date.now() - startedAt}ms`,

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

    redis: redisHealth,
  });
};
