import { BaseWorker } from '#shared/Base/BaseWorker.js';

import type { TimetableJobData } from './timetable.queue.js';
import { TimetableProcess } from './timetable.process.js';

export class TimetableWorker extends BaseWorker<TimetableJobData> {
  constructor(timetableProcess: TimetableProcess, concurrency = 3) {
    super('timetable', timetableProcess, concurrency);
  }
}

export const timetableWorker = new TimetableWorker(new TimetableProcess());
