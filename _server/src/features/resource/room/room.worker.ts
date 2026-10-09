import type { RoomJobData } from './room.queue.js';
import { RoomProcess } from './room.process.js';

import { BaseWorker } from '#shared/base/base-worker.js';
import { roomRepository } from './room.repository.js';

export class RoomWorker extends BaseWorker<RoomJobData> {
  constructor(roomProcess: RoomProcess, concurrency = 5) {
    super('room', roomProcess, concurrency);
  }
}

export const roomWorker = () => new RoomWorker(new RoomProcess(roomRepository));
