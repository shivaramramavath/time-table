import type { Job } from 'bullmq';

import { BaseProcess } from '#shared/Base/BaseProcess.js';

import type { RoomJobData } from './room.queue.js';
import type { RoomRepository } from './room.repository.js';

export class RoomProcess extends BaseProcess<RoomJobData> {
  constructor(private readonly roomRepository: RoomRepository) {
    super();
  }

  async execute(job: Job<RoomJobData>): Promise<unknown> {
    const { roomId } = job.data;

    switch (job.name) {
      case 'room:create':
        return this.handleCreated(roomId);

      case 'room:update':
        return this.handleUpdated(roomId);

      case 'room:delete':
        return this.handleDeleted(roomId);

      default:
        throw new Error(`Unsupported room action: ${job.name}`);
    }
  }

  private async handleCreated(roomId: string) {
    const room = await this.roomRepository.findById(roomId);

    if (!room) {
      throw new Error(`Room not found: ${roomId}`);
    }

    // Room created processing
  }

  private async handleUpdated(roomId: string) {
    const room = await this.roomRepository.findById(roomId);

    if (!room) {
      throw new Error(`Room not found: ${roomId}`);
    }

    // Room updated processing
  }

  private async handleDeleted(roomId: string) {
    // Room deleted processing
  }
}
