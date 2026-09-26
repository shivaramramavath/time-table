import { DesignerQueue } from '../shared/designer.queue.js';

import type { Room } from './room.model.js';

class RoomQueue extends DesignerQueue<Room> {
  constructor() {
    super('room');
  }
}

export const roomQueue = new RoomQueue();
