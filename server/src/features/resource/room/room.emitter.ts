import { BaseEmitter } from '#shared/base/base-emitter.js';

import type { Room } from './room.model.js';

class RoomEmitter extends BaseEmitter<Room> {
  constructor() {
    super('room');
  }
}

export const roomEmitter = new RoomEmitter();
