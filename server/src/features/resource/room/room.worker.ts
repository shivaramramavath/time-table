import { BaseWorker } from '#shared/Base/BaseWorker.js';
import type { Room } from './room.model.js';
import { roomProcess } from './room.process.js';

class RoomWorker extends BaseWorker<Room> {
  constructor() {
    super('room', roomProcess);
  }
}

export const roomWorker = new RoomWorker();
