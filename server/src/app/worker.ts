import logger from '#configs/logger.js';

import { messageWorker } from '#features/timetable-designer/message/message.worker.js';
import { feedbackWorker } from '#features/feedback/feedback.worker.js';
import { templateWorker } from '#features/template/template.worker.js';
import { timetableWorker } from '#features/timetable/timetable.worker.js';
import { userWorker } from '#features/user/user.worker.js';
import { nodeWorker } from '#features/timetable-designer/node/node.worker.js';
import { edgeWorker } from '#features/timetable-designer/edge/edge.worker.js';
import { subjectWorker } from '#features/resource/subject/subject.worker.js';
import { roomWorker } from '#features/resource/room/room.worker.js';
import { facultyWorker } from '#features/resource/faculty/faculty.worker.js';
import { emailWorker } from '#services/email-service/index.js';

import type { BaseWorker } from '#shared/base/base-worker.js';

export class WorkerManager {
  private readonly workers: BaseWorker[];

  constructor() {
    this.workers = [
      messageWorker,
      feedbackWorker,
      templateWorker,
      timetableWorker,
      userWorker,
      emailWorker,
      nodeWorker,
      edgeWorker,
      subjectWorker,
      roomWorker,
      facultyWorker,
    ];
  }

  async start(): Promise<void> {
    logger.info(`Starting ${this.workers.length} workers...`);

    logger.info('All workers started');
  }

  async close(): Promise<void> {
    logger.info('Closing workers...');

    await Promise.all(this.workers.map((worker) => worker.close()));

    logger.info('All workers closed');
  }
}

export const workerManager = new WorkerManager();
