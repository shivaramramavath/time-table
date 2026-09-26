import type { Job } from 'bullmq';

import { BaseProcess } from '#shared/Base/BaseProcess.js';

export interface DesignerRepository<T> {
  add(designerId: string, entity: T): Promise<unknown>;
  addMany(designerId: string, entities: T[]): Promise<unknown>;
  update(entity: T): Promise<unknown>;
  remove(designerId: string, id: string): Promise<unknown>;
  removeMany(designerId: string, ids: string[]): Promise<unknown>;
}

export interface DesignerJob<T> {
  designerId: string;
  entity?: T;
  entities?: T[];
  id?: string;
  ids?: string[];
}

export class DesignerProcess<T extends { id: string; designerId: string }> extends BaseProcess<
  DesignerJob<T>
> {
  constructor(private readonly repository: DesignerRepository<T>) {
    super();
  }

  async execute(job: Job<DesignerJob<T>>): Promise<unknown> {
    switch (job.name) {
      case 'create':
        return this.create(job);

      case 'createMany':
        return this.createMany(job);

      case 'update':
        return this.update(job);

      case 'delete':
        return this.remove(job);

      case 'deleteMany':
        return this.removeMany(job);

      default:
        throw new Error(`Unsupported designer job: ${job.name}`);
    }
  }

  private async create(job: Job<DesignerJob<T>>): Promise<unknown> {
    const { designerId, entity } = job.data;

    if (!entity) {
      throw new Error('Entity is required for create job');
    }

    return this.repository.add(designerId, entity);
  }

  private async createMany(job: Job<DesignerJob<T>>): Promise<unknown> {
    const { designerId, entities } = job.data;

    if (!entities) {
      throw new Error('Entities are required for createMany job');
    }

    return this.repository.addMany(designerId, entities);
  }

  private async update(job: Job<DesignerJob<T>>): Promise<unknown> {
    const { entity } = job.data;

    if (!entity) {
      throw new Error('Entity is required for update job');
    }

    return this.repository.update(entity);
  }

  private async remove(job: Job<DesignerJob<T>>): Promise<unknown> {
    const { designerId, id } = job.data;

    if (!id) {
      throw new Error('Id is required for delete job');
    }

    return this.repository.remove(designerId, id);
  }

  private async removeMany(job: Job<DesignerJob<T>>): Promise<unknown> {
    const { designerId, ids } = job.data;

    if (!ids) {
      throw new Error('Ids are required for deleteMany job');
    }

    return this.repository.removeMany(designerId, ids);
  }
}
