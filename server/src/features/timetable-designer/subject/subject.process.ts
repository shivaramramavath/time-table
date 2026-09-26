import { DesignerProcess, type DesignerRepository } from '../shared/designer.process.js';

import type { Subject } from './subject.model.js';
import { subjectRepository } from './subject.repository.js';

class SubjectProcess extends DesignerProcess<Subject> {
  constructor(repository: DesignerRepository<Subject> = subjectRepository) {
    super(repository);
  }
}

export const subjectProcess = new SubjectProcess();
