import { Worker, type Job, UnrecoverableError } from "bullmq";

import redis from "#configs/redis.js";
import logger from "#configs/logger.js";

import { feedbackProcessor } from "./feedback.processor.js";

const feedbackJob = async (job: Job) => {
  try {
    switch (job.name) {
      case "create":
        await feedbackProcessor.create(job.data);
        break;

      default:
        throw new UnrecoverableError(`Unknown feedback job type: ${job.name}`);
    }
  } catch (error: any) {
    logger.error("feedback job failed", {
      jobId: job.id,
      jobName: job.name,
      feedback: job.data,
      attemptsMade: job.attemptsMade,
      message: error?.message,
      stack: error?.stack,
    });

    throw error;
  }
};

export const feedbackWorker = () =>
  new Worker("feedback", feedbackJob, {
    connection: redis,

    concurrency: 10,

    removeOnComplete: {
      age: 0,
    },

    removeOnFail: {
      count: 100,
    },
  });
