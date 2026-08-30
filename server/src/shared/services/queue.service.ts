import redis from "#configs/redis.js";
import { Queue } from "bullmq";

const emailQueue = new Queue("email", {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 3000,
    },
    removeOnComplete: true,
    removeOnFail: false,
    priority: 2,
  },
});

export const queueService = {
  forgotPassword: (data: any) => emailQueue.add("forgot-password", data),
  registerGreeting: (data: any) => emailQueue.add("register-greeting", data),
  feedback: (data: any) => emailQueue.add("feedback", data),
};
