import { DesignerProcess, type DesignerRepository } from '../shared/designer.process.js';

import type { Room } from './room.model.js';
import { roomRepository } from './room.repository.js';

class RoomProcess extends DesignerProcess<Room> {
  constructor(repository: DesignerRepository<Room> = roomRepository) {
    super(repository);
  }
}

export const roomProcess = new RoomProcess();
