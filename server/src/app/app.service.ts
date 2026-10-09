import { Injectable } from '@nestjs/common';
import os from 'node:os';

@Injectable()
export class AppService {
  getHello(): string {
    return 'server running..';
  }

  getHealth() {
    const startedAt = Date.now();

    return {
      status: 'ok',

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
    };
  }
}
