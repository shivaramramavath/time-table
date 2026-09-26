import type { Job } from 'bullmq';

import { BaseProcess } from '#shared/Base/BaseProcess.js';

import type { UpdatePasswordJob } from './user.queue.js';
import { userRepository } from './user.dependency.js';

export class UserProcess extends BaseProcess<UpdatePasswordJob> {
  async execute(job: Job<UpdatePasswordJob>): Promise<void> {
    switch (job.name) {
      case 'user:password:update':
        await this.updatePassword(job.data);
        break;

      default:
        throw new Error(`Unsupported user job: ${job.name}`);
    }
  }

  private async updatePassword(data: UpdatePasswordJob): Promise<void> {
    await userRepository.updatePassword(data.userId, data.password);
  }
}
