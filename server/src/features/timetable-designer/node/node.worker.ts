import { Worker, type Job, UnrecoverableError } from "bullmq";

import redis from "#configs/redis.js";
import logger from "#configs/logger.js";

import { nodeProcessor } from "./node.processor.js";

const nodeJob = async (job: Job) => {
  try {
    switch (job.name) {
      case "create":
        await nodeProcessor.add(job.data.node);
        break;

      case "createMany":
        await nodeProcessor.addMany(job.data.nodes);
        break;

      case "update":
        await nodeProcessor.update(job.data.node);
        break;

      case "delete":
        await nodeProcessor.remove(job.data.designerId, job.data.nodeId);
        break;

      case "deleteMany":
        await nodeProcessor.removeMany(job.data.designerId, job.data.nodeIds);
        break;

      default:
        throw new UnrecoverableError(`Unknown node job type: ${job.name}`);
    }
  } catch (error: any) {
    logger.error("node job failed", {
      jobId: job.id,
      jobName: job.name,
      node: job.data,
      attemptsMade: job.attemptsMade,
      message: error?.message,
      stack: error?.stack,
    });

    throw error;
  }
};

const createNodeWorker = () =>
  new Worker("node", nodeJob, {
    connection: redis,
    concurrency: 10,

    removeOnComplete: {
      age: 0,
    },

    removeOnFail: {
      count: 100,
    },
  });

export default createNodeWorker;
