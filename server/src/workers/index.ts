import logger from "#configs/logger.js";

import { Worker } from "bullmq";

import workerEventHandlers from "./workerEventHandlers.js";

import { roomWorker } from "#features/timetable-designer/room/room.worker.js";
import { subjectWorker } from "#features/timetable-designer/subject/subject.worker.js";
import { facultyWorker } from "#features/timetable-designer/faculty/faculty.worker.js";
import { nodeWorker } from "#features/timetable-designer/node/node.worker.js";
import { edgeWorker } from "#features/timetable-designer/edge/edge.worker.js";
import { messageWorker } from "#features/timetable-designer/message/message.worker.js";
import { emailWorker } from "./email/email.worker.js";
import { feedbackWorker } from "#features/feedback/feedback.worker.js";

const workerFactories = [
  emailWorker,
  roomWorker,
  subjectWorker,
  facultyWorker,
  nodeWorker,
  edgeWorker,
  messageWorker,
  feedbackWorker,
];

let workers: Worker[] = [];

const start = async (): Promise<void> => {
  workers = workerFactories.map((createWorker) => {
    const worker = createWorker();

    workerEventHandlers(worker);

    return worker;
  });

  logger.info("All workers started");
};

const close = async (): Promise<void> => {
  logger.info("Closing workers...");

  await Promise.all(workers.map((worker) => worker.close()));

  logger.info("All workers closed");
};

export const worker = {
  start,
  close,
};
