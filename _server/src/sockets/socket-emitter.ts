import { socketRegistry, type SocketRegistry } from './socket-registry.js';
import { SocketServer } from './socket-server.js';
import { socketServer } from '../app/server.js';

export class SocketEmitter {
  async emitToUser<T>(userId: string, event: string, data: T): Promise<void> {
    const socketId = await socketRegistry.getSocketId(userId);

    if (!socketId) {
      throw new Error(`Socket not found for user ${userId}`);
    }

    socketServer.getInstance().to(socketId).emit(event, data);
  }
}

export const socketEmitter = new SocketEmitter();
