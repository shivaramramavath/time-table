import mongoose from 'mongoose';
import type { Room } from './room.model.js';
import { roomRepository, RoomRepository } from './room.repository.js';

export class RoomService {
  constructor(private readonly roomRepository: RoomRepository) {}

  async getById(id: string) {
    const room = await this.roomRepository.findById(id);

    if (!room) {
      throw new Error('Room not found');
    }

    return room;
  }

  async getAll() {
    return this.roomRepository.find();
  }

  async create(data: Room) {
    const existing = await this.roomRepository.findByCode(data.code);

    if (existing) {
      throw new Error('Room number already exists');
    }

    const room: Room = {
      ...data,
      id: new mongoose.Types.ObjectId(),
    };

    return this.roomRepository.create(room);
  }

  async update(id: string, data: Partial<Room>) {
    if (data.code) {
      const existing = await this.roomRepository.findByCode(data.code);

      if (existing && existing.id !== id) {
        throw new Error('Room number already exists');
      }
    }

    const room = await this.roomRepository.update(id, data);

    if (!room) {
      throw new Error('Room not found');
    }

    return room;
  }

  async delete(id: string) {
    const room = await this.roomRepository.delete(id);

    if (!room) {
      throw new Error('Room not found');
    }

    return room;
  }
}

export const roomService = new RoomService(roomRepository);
