import { BaseQueue } from '#shared/base/base-queue.js';

export interface RoomJobData {
  roomId: string;
}

export class RoomQueue extends BaseQueue<RoomJobData> {
  constructor() {
    super('room');
  }

  async addRoomJob(data: RoomJobData) {
    return this.add('room:create', data);
  }

  async updateRoomJob(data: RoomJobData) {
    return this.add('room:update', data);
  }

  async deleteRoomJob(data: RoomJobData) {
    return this.add('room:delete', data);
  }
}

export const roomQueue = new RoomQueue();
