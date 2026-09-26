import { DesignerProcess, type DesignerRepository } from '../shared/designer.process.js';

import type { Faculty } from './faculty.model.js';
import { facultyRepository } from './faculty.repository.js';

class FacultyProcess extends DesignerProcess<Faculty> {
  constructor(repository: DesignerRepository<Faculty> = facultyRepository) {
    super(repository);
  }
}

export const facultyProcess = new FacultyProcess();
