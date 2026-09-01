import { Worker, type Job, UnrecoverableError } from "bullmq";

import redis from "#configs/redis.js";
import logger from "#configs/logger.js";

export interface DesignerProcessor<T> {
  add(entity: T): Promise<unknown>;

  addMany?(entities: T[]): Promise<unknown>;

  update(entity: T): Promise<unknown>;

  remove(designerId: string, id: string): Promise<unknown>;

  removeMany?(designerId: string, ids: string[]): Promise<unknown>;
}

export const createDesignerWorker = <T>(
  name: string,
  processor: DesignerProcessor<T>,
  options?: {
    concurrency?: number;
  },
) => {
  const worker = new Worker(
    name,

    async (job: Job) => {
      try {
        switch (job.name) {
          case "create":
            await processor.add(job.data.entity);
            break;

          case "createMany":
            if (!processor.addMany) {
              throw new UnrecoverableError(
                `${name} does not support createMany`,
              );
            }

            await processor.addMany(job.data.entities);
            break;

          case "update":
            await processor.update(job.data.entity);
            break;

          case "delete":
            await processor.remove(job.data.designerId, job.data.id);
            break;

          case "deleteMany":
            if (!processor.removeMany) {
              throw new UnrecoverableError(
                `${name} does not support deleteMany`,
              );
            }

            await processor.removeMany(job.data.designerId, job.data.ids);
            break;

          default:
            throw new UnrecoverableError(`Unknown ${name} job: ${job.name}`);
        }
      } catch (error: any) {
        logger.error(`${name} job failed`, {
          jobId: job.id,
          jobName: job.name,
          data: job.data,
          attemptsMade: job.attemptsMade,
          message: error?.message,
          stack: error?.stack,
        });

        throw error;
      }
    },

    {
      connection: redis,

      concurrency: options?.concurrency ?? 10,

      removeOnComplete: {
        age: 0,
      },

      removeOnFail: {
        count: 100,
      },
    },
  );

  return worker;
};
