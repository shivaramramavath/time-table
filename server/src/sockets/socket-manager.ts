import type { Server } from 'socket.io';
import type { Socket } from 'socket.io';

import logger from '#configs/logger.js';
import { socketAuth } from '#middlewares/auth/socket-auth.middleware.js';

import { socketRegistry, type SocketRegistry } from './socket-registry.js';

import {
  registerEdgeListeners,
  registerFacultyListeners,
  registerMessageListeners,
  registerNodeListeners,
  registerRoomListeners,
  registerSubjectListeners,
  registerTimetableDesignerListeners,
  registerTimetableListeners,
} from './listeners/index.js';

import { registerTemplateListeners } from './listeners/template.listener.js';
import { socketServer } from '../app/server.js';

export class SocketManager {
  constructor(
    private readonly io: Server,
    private readonly registry: SocketRegistry,
  ) {}

  register(): void {
    this.io.use(socketAuth);

    this.io.on('connection', (socket: Socket) => {
      this.handleConnection(socket);
    });
  }

  private handleConnection(socket: Socket): void {
    const userId = socket.data.user.userId;

    logger.info(`Socket connected: ${socket.id}`);

    void this.registry.setSocketId(userId, socket.id);

    this.registerListeners(socket);

    socket.on('disconnect', (reason) => {
      void this.handleDisconnect(userId, socket.id, reason);
    });
  }

  private registerListeners(socket: Socket): void {
    registerTimetableDesignerListeners(socket);
    registerNodeListeners(socket);
    registerEdgeListeners(socket);
    registerFacultyListeners(socket);
    registerSubjectListeners(socket);
    registerRoomListeners(socket);
    registerTemplateListeners(socket);
    registerTimetableListeners(socket);
    registerMessageListeners(socket);
  }

  private async handleDisconnect(userId: string, socketId: string, reason: string): Promise<void> {
    logger.info(`Socket disconnected: ${socketId} | reason=${reason}`);

    const currentSocketId = await this.registry.getSocketId(userId);

    if (currentSocketId === socketId) {
      await this.registry.removeSocketId(userId);
    }
  }
}

export const socketManager = new SocketManager(socketServer.getInstance(), socketRegistry);
