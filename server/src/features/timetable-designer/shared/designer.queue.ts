import type { JobsOptions } from 'bullmq';

import { BaseQueue } from '#shared/Base/BaseQueue.js';

import type { DesignerEntity, DesignerJob } from './designer.types.js';

export abstract class DesignerQueue<T extends DesignerEntity> extends BaseQueue<DesignerJob<T>> {
  constructor(queueName: string, jobOptions?: JobsOptions) {
    super(queueName, jobOptions);
  }

  async add(designerId: string, entity: T) {
    return super.add('create', {
      designerId,
      entity,
    });
  }

  async addMany(designerId: string, entities: T[]) {
    return super.add('createMany', {
      designerId,
      entities,
    });
  }

  async update(entity: T) {
    return super.add('update', {
      designerId: entity.designerId,
      entity,
    });
  }

  async remove(designerId: string, id: string) {
    return super.add('delete', {
      designerId,
      id,
    });
  }

  async removeMany(designerId: string, ids: string[]) {
    return super.add('deleteMany', {
      designerId,
      ids,
    });
  }
}
