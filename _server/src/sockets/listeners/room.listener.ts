import type { Socket } from 'socket.io';
import createHttpError from 'http-errors';

import { RoomService, roomService } from '#features/resource/room/room.service.js';

import { asyncSocketHandler } from '../handlers/async-socket-handler.js';

export class RoomListener {
  constructor(
    private readonly socket: Socket,
    private readonly service: RoomService,
  ) {}

  register(): void {
    this.registerCreate();
    this.registerUpdate();
    this.registerDelete();
  }

  private registerCreate(): void {
    this.socket.on(
      'room:create',
      asyncSocketHandler('room:create', async (payload) => {
        const { designerId, room } = payload;

        return this.service.create(designerId, room);
      }),
    );
  }

  private registerUpdate(): void {
    this.socket.on(
      'room:update',
      asyncSocketHandler('room:update', async (payload) => {
        const { designerId, roomId, data } = payload;

        const updatedRoom = await this.service.update(designerId, roomId, data);

        if (!updatedRoom) {
          throw createHttpError.InternalServerError('Failed to update room');
        }

        return updatedRoom;
      }),
    );
  }

  private registerDelete(): void {
    this.socket.on(
      'room:delete',
      asyncSocketHandler('room:delete', async (payload) => {
        const { designerId, roomId } = payload;

        const deleted = await this.service.delete(designerId, roomId);

        if (!deleted) {
          throw createHttpError.InternalServerError('Failed to delete room');
        }

        return {
          roomId,
        };
      }),
    );
  }
}

export const registerRoomListeners = (socket: Socket): RoomListener => {
  const listener = new RoomListener(socket, roomService);

  listener.register();

  return listener;
};
