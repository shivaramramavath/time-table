import type { FacultyJobData } from './faculty.queue.js';
import { FacultyProcess } from './faculty.process.js';

import { BaseWorker } from '#shared/queue/BaseWorker.js';
import { facultyRepository } from './faculty.repository.js';

export class FacultyWorker extends BaseWorker<FacultyJobData> {
  constructor(facultyProcess: FacultyProcess, concurrency = 5) {
    super('faculty', facultyProcess, concurrency);
  }
}

export const facultyWorker = () => new FacultyWorker(new FacultyProcess(facultyRepository));
