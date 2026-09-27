import type { Job } from 'bullmq';

import { BaseProcess } from '#shared/base/base-process.js';

import type { UpdateJob } from './user.queue.js';
import { userRepository } from './user.dependency.js';

export class UserProcess extends BaseProcess<UpdateJob> {
  async execute(job: Job<UpdateJob>): Promise<void> {
    switch (job.name) {
      case 'user:update':
        await this.update(job.data);
        break;

      default:
        throw new Error(`Unsupported user job: ${job.name}`);
    }
  }

  private async update(data: UpdateJob): Promise<void> {
    await userRepository.update(data.userId, data.data);
  }
}
