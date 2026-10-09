import { BaseEmitter } from '#shared/base/base-emitter.js';

import type { Subject } from './subject.model.js';

class SubjectEmitter extends BaseEmitter<Subject> {
  constructor() {
    super('subject');
  }
}

export const subjectEmitter = new SubjectEmitter();
