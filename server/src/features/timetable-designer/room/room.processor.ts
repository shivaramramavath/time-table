import type { Room } from './room.model.js';

import { roomRepository } from './room.repository.js';

export const roomProcessor = {
  add: async (room: Room) => {
    return roomRepository.create(room);
  },

  addMany: async (rooms: Room[]) => {
    return roomRepository.createMany(rooms);
  },

  update: async (room: Room) => {
    return roomRepository.update(room.designerId, room.id, room);
  },

  remove: async (designerId: string, id: string) => {
    return roomRepository.delete(designerId, id);
  },

  removeMany: async (designerId: string, ids: string[]) => {
    return roomRepository.deleteMany(designerId, ids);
  },
};
