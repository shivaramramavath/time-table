import { BaseEmitter } from '#shared/Base/BaseEmitter.js';

import type { Faculty } from './faculty.model.js';

class FacultyEmitter extends BaseEmitter<Faculty> {
  constructor() {
    super('faculty');
  }
}

export const facultyEmitter = new FacultyEmitter();
