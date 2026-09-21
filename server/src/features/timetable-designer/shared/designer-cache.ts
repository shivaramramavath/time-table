import { DESIGNER_TTL } from '#configs/constants.js';
import redis from '#configs/redis.js';
import { generateId } from '#utils/generate-ids.js';

export interface DesignerEntity {
  id: string;
  designerId: string;
}

export interface CacheRepository<T extends DesignerEntity> {
  findById(designerId: string, id: string): Promise<T | null>;
  findAll(designerId: string): Promise<T[]>;
}

export interface CacheQueue<T extends DesignerEntity> {
  add(designerId: string, entity: T): Promise<unknown>;
  addMany(designerId: string, entities: T[]): Promise<unknown>;
  update(entity: T): Promise<unknown>;
  remove(designerId: string, id: string): Promise<unknown>;
  removeMany(designerId: string, ids: string[]): Promise<unknown>;
}

interface CreateOptions<T extends DesignerEntity> {
  resource: string;
  repository: CacheRepository<T>;
  queue: CacheQueue<T>;
}

export const createDesignerCache = <T extends DesignerEntity>({
  resource,
  repository,
  queue,
}: CreateOptions<T>) => {
  const key = (designerId: string) => `designer:${designerId}:${resource}`;

  const getById = async (designerId: string, id: string): Promise<T | null> => {
    const redisKey = key(designerId);

    const cached = await redis.hget(redisKey, id);

    if (cached) {
      return JSON.parse(cached) as T;
    }

    const entity = await repository.findById(designerId, id);

    if (!entity) {
      return null;
    }

    await redis
      .multi()
      .hset(redisKey, id, JSON.stringify(entity))
      .expire(redisKey, DESIGNER_TTL)
      .exec();

    return entity;
  };

  const getAll = async (designerId: string): Promise<T[]> => {
    const redisKey = key(designerId);

    const cached = await redis.hgetall(redisKey);

    if (Object.keys(cached).length > 0) {
      return Object.values(cached).map((value) => JSON.parse(value) as T);
    }

    const entities = await repository.findAll(designerId);

    if (entities.length === 0) {
      return [];
    }

    const pipeline = redis.multi();

    for (const entity of entities) {
      pipeline.hset(redisKey, entity.id, JSON.stringify(entity));
    }

    pipeline.expire(redisKey, DESIGNER_TTL);

    await pipeline.exec();

    return entities;
  };

  const create = async (designerId: string, entity: T): Promise<T> => {
    const redisKey = key(designerId);

    const newEntity: T = {
      ...entity,
      id: entity.id || generateId(resource),
      designerId,
    };

    await redis
      .multi()
      .hset(redisKey, newEntity.id, JSON.stringify(newEntity))
      .expire(redisKey, DESIGNER_TTL)
      .exec();

    await queue.add(designerId, newEntity);

    return newEntity;
  };

  const createMany = async (designerId: string, entities: T[]): Promise<T[]> => {
    if (entities.length === 0) {
      return [];
    }

    const redisKey = key(designerId);

    const newEntities = entities.map((entity) => ({
      ...entity,
      id: entity.id || generateId(resource),
      designerId,
    })) as T[];

    const pipeline = redis.multi();

    for (const entity of newEntities) {
      pipeline.hset(redisKey, entity.id, JSON.stringify(entity));
    }

    pipeline.expire(redisKey, DESIGNER_TTL);

    await pipeline.exec();

    await queue.addMany(designerId, newEntities);

    return newEntities;
  };

  const updateById = async (
    designerId: string,
    id: string,
    data: Partial<T>,
  ): Promise<T | null> => {
    const redisKey = key(designerId);

    let existing = await redis.hget(redisKey, id);

    if (!existing) {
      const entity = await repository.findById(designerId, id);

      if (!entity) {
        return null;
      }

      existing = JSON.stringify(entity);
    }

    const updatedEntity: T = {
      ...JSON.parse(existing),
      ...data,
      id,
      designerId,
    };

    await redis
      .multi()
      .hset(redisKey, id, JSON.stringify(updatedEntity))
      .expire(redisKey, DESIGNER_TTL)
      .exec();

    await queue.update(updatedEntity);

    return updatedEntity;
  };

  const deleteById = async (designerId: string, id: string): Promise<boolean> => {
    const redisKey = key(designerId);

    await redis.hdel(redisKey, id);

    await queue.remove(designerId, id);

    return true;
  };

  const deleteMany = async (designerId: string, ids: string[]): Promise<number> => {
    if (ids.length === 0) {
      return 0;
    }

    const redisKey = key(designerId);

    const deleted = await redis.hdel(redisKey, ...ids);

    await queue.removeMany(designerId, ids);

    return deleted;
  };

  const invalidate = async (designerId: string): Promise<void> => {
    await redis.del(key(designerId));
  };

  const invalidateById = async (designerId: string, id: string): Promise<void> => {
    await redis.hdel(key(designerId), id);
  };

  return {
    getById,
    getAll,

    create,
    createMany,

    updateById,

    deleteById,
    deleteMany,

    invalidate,
    invalidateById,
  };
};
