import { BaseEmitter } from '#shared/Base/BaseEmitter.js';

import type { Subject } from './subject.model.js';

class SubjectEmitter extends BaseEmitter<Subject> {
  constructor() {
    super('subject');
  }
}

export const subjectEmitter = new SubjectEmitter();
