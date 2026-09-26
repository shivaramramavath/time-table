import { DESIGNER_TTL } from '#configs/constants.js';
import { generateId } from '#utils/generate-ids.js';

import { BaseHashCache } from '#shared/Base/BaseObjectCache.js';

export interface DesignerEntity {
  id: string;
  designerId: string;
}

export interface DesignerRepository<T extends DesignerEntity> {
  findById(designerId: string, id: string): Promise<T | null>;

  findAll(designerId: string): Promise<T[]>;
}

export interface DesignerQueue<T extends DesignerEntity> {
  add(designerId: string, entity: T): Promise<unknown>;

  addMany(designerId: string, entities: T[]): Promise<unknown>;

  update(entity: T): Promise<unknown>;

  remove(designerId: string, id: string): Promise<unknown>;

  removeMany(designerId: string, ids: string[]): Promise<unknown>;
}

export abstract class DesignerCache<T extends DesignerEntity> extends BaseHashCache {
  constructor(
    resource: string,
    protected readonly repository: DesignerRepository<T>,
    protected readonly queue: DesignerQueue<T>,
  ) {
    super(`designer`, DESIGNER_TTL);

    this.resource = resource;
  }

  private readonly resource: string;

  private designerKey(designerId: string): string {
    return `${designerId}:${this.resource}`;
  }

  async getById(designerId: string, id: string): Promise<T | null> {
    const key = this.designerKey(designerId);

    const cached = await this.get<T>(key, id);

    if (cached) {
      return cached;
    }

    const entity = await this.repository.findById(designerId, id);

    if (!entity) {
      return null;
    }

    await this.set(key, id, entity);

    return entity;
  }

  async getAll(designerId: string): Promise<T[]> {
    const key = this.designerKey(designerId);

    const cached = await this.getAllFromCache<T>(key);

    if (cached.length) {
      return cached;
    }

    const entities = await this.repository.findAll(designerId);

    if (!entities.length) {
      return [];
    }

    await this.setMany(
      key,
      entities.map((entity) => ({
        field: entity.id,
        value: entity,
      })),
    );

    return entities;
  }

  async create(designerId: string, entity: T): Promise<T> {
    const newEntity = {
      ...entity,
      id: entity.id || generateId(this.resource),
      designerId,
    } as T;

    await this.set(this.designerKey(designerId), newEntity.id, newEntity);

    await this.queue.add(designerId, newEntity);

    return newEntity;
  }

  async createMany(designerId: string, entities: T[]): Promise<T[]> {
    if (!entities.length) {
      return [];
    }

    const newEntities = entities.map(
      (entity) =>
        ({
          ...entity,
          id: entity.id || generateId(this.resource),
          designerId,
        }) as T,
    );

    await this.setMany(
      this.designerKey(designerId),
      newEntities.map((entity) => ({
        field: entity.id,
        value: entity,
      })),
    );

    await this.queue.addMany(designerId, newEntities);

    return newEntities;
  }

  async updateById(designerId: string, id: string, data: Partial<T>): Promise<T | null> {
    const existing = await this.getById(designerId, id);

    if (!existing) {
      return null;
    }

    const updatedEntity = {
      ...existing,
      ...data,
      id,
      designerId,
    } as T;

    await this.set(this.designerKey(designerId), id, updatedEntity);

    await this.queue.update(updatedEntity);

    return updatedEntity;
  }

  async deleteById(designerId: string, id: string): Promise<boolean> {
    await this.delete(this.designerKey(designerId), id);

    await this.queue.remove(designerId, id);

    return true;
  }

  async deleteMany(designerId: string, ids: string[]): Promise<number> {
    if (!ids.length) {
      return 0;
    }

    const deleted = await this.deleteManyFromCache(this.designerKey(designerId), ids);

    await this.queue.removeMany(designerId, ids);

    return deleted;
  }

  async invalidate(designerId: string): Promise<void> {
    await this.clear(this.designerKey(designerId));
  }

  async invalidateById(designerId: string, id: string): Promise<void> {
    await this.delete(this.designerKey(designerId), id);
  }

  private async getAllFromCache<TValue>(key: string): Promise<TValue[]> {
    return super.getAll<TValue>(key);
  }

  private async deleteManyFromCache(key: string, ids: string[]): Promise<number> {
    return super.deleteMany(key, ids);
  }
}
