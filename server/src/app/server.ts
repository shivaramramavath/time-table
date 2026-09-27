import http from 'http';

import { env } from '#configs/env.js';
import logger from '#configs/logger.js';

import { app } from './app.js';
import { workerManager } from './worker.js';

import { registerShutdownHandlers } from '#utils/shutdown/register-shutdown-handlers.js';
import { socketManager } from '../sockets/socket-manager.js';
import { database } from '../infrastructure/database/mongodb.js';
import { SocketServer } from '../sockets/socket-server.js';
import { redisClient } from '../infrastructure/cache/redis/redis.client.js';

const server = http.createServer(app);

export const socketServer = new SocketServer(server);

const bootstrap = async () => {
  try {
    logger.info('Starting server...');

    await redisClient.checkHealth();

    await database.connect();

    await workerManager.start();

    server.listen(env.PORT, () => {
      logger.info(`Server started on port ${env.PORT}`);
    });

    socketManager.register();
    registerShutdownHandlers(server);
  } catch (error) {
    logger.error('Server startup failed', error);

    process.exit(1);
  }
};

bootstrap();
