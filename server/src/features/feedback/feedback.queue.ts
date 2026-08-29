import { Queue } from "bullmq";
import redis from "#configs/redis.js";

const queue = new Queue("feedback", {
  connection: redis,

  defaultJobOptions: {
    attempts: 3,

    backoff: {
      type: "exponential",
      delay: 1000,
    },

    removeOnComplete: 100,
    removeOnFail: 500,
  },
});

export const feedbackQueue = {
  create: async (data: any) => queue.add("create", data),
};
