import { BaseEmitter } from '#shared/base/base-emitter.js';

import type { Faculty } from './faculty.model.js';

class FacultyEmitter extends BaseEmitter<Faculty> {
  constructor() {
    super('faculty');
  }
}

export const facultyEmitter = new FacultyEmitter();
