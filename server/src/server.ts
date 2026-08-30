import http from "http";

import { env } from "#configs/env.js";
import logger from "#configs/logger.js";
import { database } from "#configs/database.js";
import { checkRedis } from "#configs/redis.js";

import app from "./app.js";
import { worker } from "./workers/index.js";

import { registerShutdownHandlers } from "#utils/graceful-shutdown.js";
import { createSocketServer } from "#configs/socket.js";
import { registerSocket } from "./sockets/index.js";

const server = http.createServer(app);

export const io = createSocketServer(server);

const bootstrap = async () => {
  try {
    logger.info("Starting server...");

    await checkRedis();

    await database.connect();

    await worker.start();

    server.listen(env.PORT, () => {
      logger.info(`Server started on port ${env.PORT}`);
    });

    registerSocket(io);
    registerShutdownHandlers(server);
  } catch (error) {
    logger.error("Server startup failed", error);

    process.exit(1);
  }
};

bootstrap();
