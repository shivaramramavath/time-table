import { io } from '../server.js';
import { socketRegistry } from './socket-registry.js';

export const emitToUser = async <T>(userId: string, event: string, data: T): Promise<void> => {
  const socketId = await socketRegistry.getSocketId(userId);

  if (!socketId) {
    return;
  }

  io.to(socketId).emit(event, data);
};
