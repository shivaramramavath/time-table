import { BaseEmitter } from '#shared/Base/BaseEmitter.js';

import type { Room } from './room.model.js';

class RoomEmitter extends BaseEmitter<Room> {
  constructor() {
    super('room');
  }
}

export const roomEmitter = new RoomEmitter();
