import { Queue, type JobsOptions } from "bullmq";

import redis from "#configs/redis.js";
import { CacheQueue, DesignerEntity } from "./designer-cache.js";

const DEFAULT_JOB_OPTIONS: JobsOptions = {
  attempts: 3,

  backoff: {
    type: "exponential",
    delay: 1000,
  },

  removeOnComplete: 100,
  removeOnFail: 500,
};

interface CreateDesignerQueueOptions {
  name: string;
  jobOptions?: JobsOptions;
}

export const createDesignerQueue = <T extends DesignerEntity>({
  name,
  jobOptions,
}: CreateDesignerQueueOptions): CacheQueue<T> => {
  const queue = new Queue(name, {
    connection: redis,

    defaultJobOptions: {
      ...DEFAULT_JOB_OPTIONS,
      ...jobOptions,
    },
  });

  return {
    add: async (designerId: string, entity: T) => {
      return queue.add("create", {
        designerId,
        entity,
      });
    },

    addMany: async (designerId: string, entities: T[]) => {
      return queue.add("createMany", {
        designerId,
        entities,
      });
    },

    update: async (entity: T) => {
      return queue.add("update", {
        designerId: entity.designerId,
        entity,
      });
    },

    remove: async (designerId: string, id: string) => {
      return queue.add("delete", {
        designerId,
        id,
      });
    },

    removeMany: async (designerId: string, ids: string[]) => {
      return queue.add("deleteMany", {
        designerId,
        ids,
      });
    },
  };
};
