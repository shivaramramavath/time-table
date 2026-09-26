import { DesignerQueue } from '../../timetable-designer/shared/designer.queue.js';

import type { Subject } from './subject.model.js';

class SubjectQueue extends DesignerQueue<Subject> {
  constructor() {
    super('subject');
  }
}

export const subjectQueue = new SubjectQueue();
