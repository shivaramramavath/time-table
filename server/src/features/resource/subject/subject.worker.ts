import type { SubjectJobData } from './subject.queue.js';
import { SubjectProcess } from './subject.process.js';

import { BaseWorker } from '#shared/base/base-worker.js';
import { subjectRepository } from './subject.repository.js';

export class SubjectWorker extends BaseWorker<SubjectJobData> {
  constructor(subjectProcess: SubjectProcess, concurrency = 5) {
    super('subject', subjectProcess, concurrency);
  }
}

export const subjectWorker = () => new SubjectWorker(new SubjectProcess(subjectRepository));
