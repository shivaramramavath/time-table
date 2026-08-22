import { Worker, Job, UnrecoverableError } from "bullmq";

import redis from "#configs/redis.js";
import logger from "#configs/logger.js";
import { subjectProcessor } from "./subject.processor.js";

const subjectJob = async (job: Job) => {
  try {
    switch (job.name) {
      case "create":
        await subjectProcessor.add(job.data.subject);
        break;

      case "update":
        await subjectProcessor.update(job.data.subject);
        break;

      case "remove":
        await subjectProcessor.remove(job.data.id);
        break;

      default:
        throw new UnrecoverableError(`Unknown subject job type: ${job.name}`);
    }
  } catch (error: any) {
    const status = error?.response?.status;

    logger.error("subject job failed", {
      jobId: job.id,
      jobName: job.name,
      subject: job.data,
      status,
      attemptsMade: job.attemptsMade,
      message: error?.message,
      stack: error?.stack,
    });

    throw error;
  }
};

const createSubjectWorker = () =>
  new Worker("subject", subjectJob, {
    connection: redis,
    concurrency: 10,

    removeOnComplete: {
      age: 0,
    },

    removeOnFail: {
      count: 100,
    },
  });

export default createSubjectWorker;
