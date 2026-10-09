import { Server } from 'socket.io';
import type { Server as HttpServer } from 'http';

import { env } from '#configs/env.js';

export class SocketServer {
  public readonly io: Server;

  constructor(private readonly server: HttpServer) {
    this.io = new Server(this.server, {
      cors: {
        origin: env.ORIGIN_URL,
        credentials: true,
      },
    });
  }

  getInstance(): Server {
    return this.io;
  }
}
