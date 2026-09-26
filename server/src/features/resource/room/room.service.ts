import { Room } from './room.model.js';
import { roomCache } from './room.cache.js';
import { roomRepository } from './room.repository.js';

export const roomService = {
  getById: async (designerId: string, id: string) => {
    return roomCache.getById(designerId, id);
  },

  getAll: async (designerId: string) => {
    return roomCache.getAll(designerId);
  },

  create: async (designerId: string, data: Room) => {
    const existing = await roomRepository.findByRoomNumber(designerId, data.roomNumber);

    if (existing) {
      throw new Error('Room number already exists');
    }

    const room: Room = {
      ...data,
      designerId,
      id: crypto.randomUUID(),
    };

    return roomCache.create(designerId, room);
  },

  update: async (designerId: string, id: string, data: Partial<Room>) => {
    if (data.roomNumber) {
      const existing = await roomRepository.findByRoomNumber(designerId, data.roomNumber);

      if (existing && existing.id !== id) {
        throw new Error('Room number already exists');
      }
    }

    return roomCache.updateById(designerId, id, data);
  },

  delete: async (designerId: string, id: string) => {
    return roomCache.deleteById(designerId, id);
  },
};
