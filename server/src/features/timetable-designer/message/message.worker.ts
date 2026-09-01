import { Worker, type Job, UnrecoverableError } from "bullmq";

import redis from "#configs/redis.js";
import logger from "#configs/logger.js";

import { messageProcessor, type MessageJobData } from "./message.processor.js";

const messageJob = async (job: Job<MessageJobData>) => {
  try {
    switch (job.name) {
      case "create":
        await messageProcessor.create(job);
        break;

      default:
        throw new UnrecoverableError(`Unknown message job type: ${job.name}`);
    }
  } catch (error: any) {
    logger.error("message job failed", {
      jobId: job.id,
      jobName: job.name,
      data: job.data,
      attemptsMade: job.attemptsMade,
      message: error?.message,
      stack: error?.stack,
    });

    throw error;
  }
};

export const messageWorker = () => {
  return new Worker<MessageJobData>("message", messageJob, {
    connection: redis,
    concurrency: 10,

    removeOnComplete: {
      age: 0,
    },

    removeOnFail: {
      count: 100,
    },
  });
};

