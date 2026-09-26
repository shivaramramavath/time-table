import type { Job } from 'bullmq';

import { BaseProcess } from '#shared/Base/BaseProcess.js';

import type { Node } from './node.model.js';
import { NodeRepository, nodeRepository } from './node.repository.js';
import type { NodeJob } from './node.queue.js';

class NodeProcess extends BaseProcess<NodeJob> {
  constructor(private readonly repository: NodeRepository) {
    super();
  }

  async execute(job: Job<NodeJob>): Promise<unknown> {
    switch (job.name) {
      case 'node:create':
        return this.create(job);

      case 'node:update':
        return this.update(job);

      case 'node:delete':
        return this.delete(job);

      default:
        throw new Error(`Unsupported node job: ${job.name}`);
    }
  }

  private async create(job: Job<NodeJob>) {
    const { node } = job.data;

    return this.repository.create(node);
  }

  private async update(job: Job<NodeJob>) {
    const { node } = job.data;

    return this.repository.update(node.id, node);
  }

  private async delete(job: Job<NodeJob>) {
    const { node } = job.data;

    return this.repository.delete(node.id);
  }
}

export const nodeProcessor = new NodeProcess(nodeRepository);
