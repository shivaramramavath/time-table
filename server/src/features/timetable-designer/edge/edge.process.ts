import type { Job } from 'bullmq';

import { BaseProcess } from '#shared/Base/BaseProcess.js';
import { EdgeRepository, edgeRepository } from './edge.repository.js';
import type { EdgeJob } from './edge.queue.js';

export class EdgeProcess extends BaseProcess<EdgeJob> {
  constructor(private readonly repository: EdgeRepository) {
    super();
  }

  async execute(job: Job<EdgeJob>): Promise<unknown> {
    switch (job.name) {
      case 'edge:create':
        return this.create(job);

      case 'edge:update':
        return this.update(job);

      case 'edge:delete':
        return this.delete(job);

      default:
        throw new Error(`Unsupported edge job: ${job.name}`);
    }
  }

  private async create(job: Job<EdgeJob>) {
    const { edge } = job.data;

    return this.repository.create(edge);
  }

  private async update(job: Job<EdgeJob>) {
    const { edge } = job.data;

    return this.repository.update(edge.id, edge);
  }

  private async delete(job: Job<EdgeJob>) {
    const { edge } = job.data;

    return this.repository.delete(edge.id);
  }
}

export const edgeProcessor = new EdgeProcess(edgeRepository);
