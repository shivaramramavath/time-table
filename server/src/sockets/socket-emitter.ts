import type { Server } from 'socket.io';

import { socketRegistry, type SocketRegistry } from './socket-registry.js';
import { io } from '../server.js';

export class SocketEmitter {
  constructor(
    private readonly io: Server,
    private readonly socketRegistry: SocketRegistry,
  ) {}

  async emitToUser<T>(userId: string, event: string, data: T): Promise<void> {
    const socketId = await this.socketRegistry.getSocketId(userId);

    if (!socketId) {
      return;
    }

    this.io.to(socketId).emit(event, data);
  }
}

export const socketEmitter = new SocketEmitter(io, socketRegistry);
