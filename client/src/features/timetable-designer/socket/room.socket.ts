import { emitAsync } from '@/shared/socket/emit-async';
import type { Room } from '../types';

export const roomSocket = {
  create: (designerId: string, room: Omit<Room, 'id'>) =>
    emitAsync<Room>('room:create', {
      designerId,
      room,
    }),

  update: (designerId: string, roomId: string, data: Partial<Room>) =>
    emitAsync<Room>('room:update', {
      designerId,
      roomId,
      data,
    }),

  delete: (designerId: string, roomId: string) =>
    emitAsync<{ roomId: string }>('room:delete', {
      designerId,
      roomId,
    }),
};
