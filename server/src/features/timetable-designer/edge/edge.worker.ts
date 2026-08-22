import { Worker, type Job, UnrecoverableError } from "bullmq";

import redis from "#configs/redis.js";
import logger from "#configs/logger.js";

import { edgeProcessor } from "./edge.processor.js";

const edgeJob = async (job: Job) => {
  try {
    switch (job.name) {
      case "create":
        await edgeProcessor.add(job.data.edge);
        break;

      case "createMany":
        await edgeProcessor.addMany(job.data.edges);
        break;

      case "delete":
        await edgeProcessor.remove(job.data.designerId, job.data.edgeId);
        break;

      case "deleteMany":
        await edgeProcessor.removeMany(job.data.designerId, job.data.edgeIds);
        break;

      default:
        throw new UnrecoverableError(`Unknown edge job type: ${job.name}`);
    }
  } catch (error: any) {
    logger.error("edge job failed", {
      jobId: job.id,
      jobName: job.name,
      edge: job.data,
      attemptsMade: job.attemptsMade,
      message: error?.message,
      stack: error?.stack,
    });

    throw error;
  }
};

const createEdgeWorker = () =>
  new Worker("edge", edgeJob, {
    connection: redis,
    concurrency: 10,

    removeOnComplete: {
      age: 0,
    },

    removeOnFail: {
      count: 100,
    },
  });

export default createEdgeWorker;
