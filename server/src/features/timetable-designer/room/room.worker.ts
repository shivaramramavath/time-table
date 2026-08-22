import { Worker, Job, UnrecoverableError } from "bullmq";

import redis from "#configs/redis.js";
import logger from "#configs/logger.js";
import { roomProcessor } from "./room.processor.js";

const roomJob = async (job: Job) => {
  try {
    switch (job.name) {
      case "create":
        roomProcessor.add(job.data.room);
        break;
      case "update":
        roomProcessor.update(job.data.room);
        break;
      case "remove":
        roomProcessor.remove(job.data.id);
        break;

      default:
        throw new UnrecoverableError(`Unknown room job type: ${job.name}`);
    }
  } catch (error: any) {
    const status = error?.response?.status;

    logger.error("room job failed", {
      jobId: job.id,
      jobName: job.name,
      room: job.data,
      status,
      attemptsMade: job.attemptsMade,
      message: error?.message,
      stack: error?.stack,
    });

    throw error;
  }
};

const createroomWorker = () =>
  new Worker("room", roomJob, {
    connection: redis,
    concurrency: 10,
    removeOnComplete: {
      age: 0,
    },
    removeOnFail: {
      count: 100,
    },
  });

export default createroomWorker;
