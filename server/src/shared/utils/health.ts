import redis from '#configs/redis.js';
import os from 'os';
import type { Request, Response } from 'express';

const health = async (req: Request, res: Response) => {
  const redisInfo = await redis.info('memory');
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now(),
    server: {
      platform: process.platform,
      nodeVersion: process.version,
      cpuUsage: process.cpuUsage(),
      memoryUsage: process.memoryUsage(),
      totalMemory: os.totalmem(),
      freeMemory: os.freemem(),
      loadAverage: os.loadavg(),
    },

    redis: {
      status: redis.status,
      info: redisInfo,
    },
  });
};

export default health;
