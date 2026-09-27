import http from 'http';

import { env } from '#configs/env.js';
import logger from '#configs/logger.js';

import { app } from './app.js';
import { workerManager } from './worker.js';

import { registerShutdownHandlers } from '#utils/shutdown/register-shutdown-handlers.js';
import { SocketManager } from '../sockets/socket-manager.js';
import { database } from '../infrastructure/database/mongodb.js';
import { SocketServer } from '../sockets/socket-server.js';
import { redisClient } from '../infrastructure/cache/redis/redis.client.js';
import { socketRegistry } from '../sockets/socket-registry.js';

const httpServer = http.createServer(app);

export const socketServer = new SocketServer(httpServer);

export const socketManager = new SocketManager(socketServer.getInstance(), socketRegistry);

export const bootstrap = async () => {
  try {
    logger.info('Starting server...');

    await redisClient.checkHealth();

    await database.connect();

    await workerManager.start();

    socketManager.register();

    registerShutdownHandlers(httpServer);

    httpServer.listen(env.PORT, () => {
      logger.info(`Server started on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error('Server startup failed', error);

    process.exit(1);
  }
};
