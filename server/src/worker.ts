import logger from '#configs/logger.js';

import { messageWorker } from '#features/timetable-designer/message/message.worker.js';
import { feedbackWorker } from '#features/feedback/feedback.worker.js';

import { templateWorker } from '#features/template/template.worker.js';
import { timetableWorker } from '#features/timetable/timetable.worker.js';
import { userWorker } from '#features/user/user.worker.js';
import { emailWorker } from '#services/email-service/index.js';
import { nodeWorker } from '#features/timetable-designer/node/node.worker.js';
import { edgeWorker } from '#features/timetable-designer/edge/edge.worker.js';
import { subjectWorker } from '#features/timetable-designer/subject/subject.worker.js';
import { roomWorker } from '#features/timetable-designer/room/room.worker.js';
import { facultyWorker } from '#features/timetable-designer/faculty/faculty.worker.js';
import { BaseWorker } from '#shared/Base/BaseWorker.js';

const workers: BaseWorker[] = [
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

const start = async (): Promise<void> => {
  logger.info('All workers started');
};

const close = async (): Promise<void> => {
  logger.info('Closing workers...');

  await Promise.all(workers.map((worker) => worker.close()));

  logger.info('All workers closed');
};

export const worker = {
  start,
  close,
};
