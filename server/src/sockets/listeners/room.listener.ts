import type { Server, Socket } from 'socket.io';
import createHttpError from 'http-errors';

import { roomService } from '#features/timetable-designer/room/room.service.js';
import { asyncSocketHandler } from '../lib/async-socket-handler.js';

export const registerRoomListeners = (io: Server, socket: Socket) => {
  socket.on(
    'room:create',
    asyncSocketHandler('room:create', async (payload) => {
      const { designerId, room } = payload;

      return roomService.create(designerId, room);
    }),
  );

  socket.on(
    'room:update',
    asyncSocketHandler('room:update', async (payload) => {
      const { designerId, roomId, data } = payload;

      const updatedRoom = await roomService.update(designerId, roomId, data);

      if (!updatedRoom) {
        throw createHttpError.InternalServerError('Failed to update room');
      }

      return updatedRoom;
    }),
  );

  socket.on(
    'room:delete',
    asyncSocketHandler('room:delete', async (payload) => {
      const { designerId, roomId } = payload;

      const deleted = await roomService.delete(designerId, roomId);

      if (!deleted) {
        throw createHttpError.InternalServerError('Failed to delete room');
      }

      return { roomId };
    }),
  );
};
