import { Worker, Job, UnrecoverableError } from "bullmq";

import redis from "#configs/redis.js";
import logger from "#configs/logger.js";
import { facultyProcessor } from "./faculty.processor.js";

const facultyJob = async (job: Job) => {
  try {
    switch (job.name) {
      case "create":
        await facultyProcessor.add(job.data.faculty);
        break;

      case "update":
        await facultyProcessor.update(job.data.faculty);
        break;

      case "delete":
        await facultyProcessor.remove(job.data.facultyId);
        break;

      default:
        throw new UnrecoverableError(`Unknown faculty job type: ${job.name}`);
    }
  } catch (error: any) {
    logger.error("faculty job failed", {
      jobId: job.id,
      jobName: job.name,
      faculty: job.data,
      attemptsMade: job.attemptsMade,
      message: error?.message,
      stack: error?.stack,
    });

    throw error;
  }
};

const createFacultyWorker = () =>
  new Worker("faculty", facultyJob, {
    connection: redis,
    concurrency: 10,

    removeOnComplete: {
      age: 0,
    },

    removeOnFail: {
      count: 100,
    },
  });

export default createFacultyWorker;
