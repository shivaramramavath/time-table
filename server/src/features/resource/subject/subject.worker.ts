import { BaseWorker } from '#shared/Base/BaseWorker.js';

import type { Subject } from './subject.model.js';
import { subjectProcess } from './subject.process.js';

class SubjectWorker extends BaseWorker<Subject> {
  constructor() {
    super('subject', subjectProcess);
  }
}

export const subjectWorker = new SubjectWorker();