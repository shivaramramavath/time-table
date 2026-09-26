import type { Room } from './room.model.js';
import { roomCache } from './room.cache.js';
import { roomRepository, RoomRepository } from './room.repository.js';

export class RoomService {
  constructor(private readonly roomRepository: RoomRepository) {}

  async getById(designerId: string, id: string) {
    return this.roomCache.getById(designerId, id);
  }

  async getAll(designerId: string) {
    return this.roomCache.getAll(designerId);
  }

  async create(designerId: string, data: Room) {
    const existing = await this.roomRepository.findByRoomNumber(designerId, data.roomNumber);

    if (existing) {
      throw new Error('Room number already exists');
    }

    const room: Room = {
      ...data,
      designerId,
      id: crypto.randomUUID(),
    };

    return this.roomCache.create(designerId, room);
  }

  async update(designerId: string, id: string, data: Partial<Room>) {
    if (data.roomNumber) {
      const existing = await this.roomRepository.findByRoomNumber(designerId, data.roomNumber);

      if (existing && existing.id !== id) {
        throw new Error('Room number already exists');
      }
    }

    return this.roomCache.updateById(designerId, id, data);
  }

  async delete(designerId: string, id: string) {
    return this.roomCache.deleteById(designerId, id);
  }
}

export const roomService = new RoomService(roomRepository);
