import { Worker, Job, UnrecoverableError } from "bullmq";

import redis from "#configs/redis.js";
import logger from "#configs/logger.js";

import { emailProcessor } from "./email.processor.js";

const emailJob = async (job: Job) => {
  const { email } = job.data;

  try {
    switch (job.name) {
      case "forgot-password":
        emailProcessor.forgotPassword(email, job.data);
        break;
      case "register-greeting":
        emailProcessor.registerGreeting(email, job.data);
        break;
      case "feedback":
        emailProcessor.feedback(job.data);
        break;

      default:
        throw new UnrecoverableError(`Unknown email job type: ${job.name}`);
    }
  } catch (error: any) {
    const status = error?.response?.status;

    logger.error("Email job failed", {
      jobId: job.id,
      jobName: job.name,
      email,
      status,
      attemptsMade: job.attemptsMade,
      message: error?.message,
      stack: error?.stack,
    });

    if ([400, 401, 403, 404].includes(status)) {
      throw new UnrecoverableError(`Permanent email failure (${status})`);
    }

    throw error;
  }
};

export const emailWorker = () =>
  new Worker("email", emailJob, {
    connection: redis,
    concurrency: 10,
    removeOnComplete: {
      age: 0,
    },
    removeOnFail: {
      count: 100,
    },
  });
