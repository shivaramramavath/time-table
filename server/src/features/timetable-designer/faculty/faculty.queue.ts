import { DesignerQueue } from '../shared/designer.queue.js';

import type { Faculty } from './faculty.model.js';

class FacultyQueue extends DesignerQueue<Faculty> {
  constructor() {
    super('faculty');
  }
}

export const facultyQueue = new FacultyQueue();
