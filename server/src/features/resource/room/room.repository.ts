import { BaseRepository } from '#shared/Base/BaseRepository.js';

import { RoomModel, type Room } from './room.model.js';

export class RoomRepository extends BaseRepository<Room> {
  constructor() {
    super(RoomModel);
  }

  async findByCode(code: string) {
    return this.findOne({
      code,
    });
  }

  async findByType(type: Room['type']) {
    return this.find({
      type,
      status: 'available',
    });
  }
}

export const roomRepository = new RoomRepository();
