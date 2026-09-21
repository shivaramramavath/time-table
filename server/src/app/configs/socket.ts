import { Server } from 'socket.io';
import type { Server as HttpServer } from 'http';
import { env } from './env.js';

export const createSocketServer = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: env.ORIGIN_URL,
      credentials: true,
    },
  });

  return io;
};
