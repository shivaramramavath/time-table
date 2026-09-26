import { BaseWorker } from '#shared/Base/BaseWorker.js';

import type { Faculty } from './faculty.model.js';
import { facultyProcess } from './faculty.process.js';

class FacultyWorker extends BaseWorker<Faculty> {
  constructor() {
    super('faculty', facultyProcess);
  }
}

export const facultyWorker = new FacultyWorker();
