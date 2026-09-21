import { createDesignerCache } from '../shared/designer-cache.js';
import { Faculty } from './faculty.model.js';

import { facultyQueue } from './faculty.queue.js';
import { facultyRepository } from './faculty.repository.js';

export const facultyCache = createDesignerCache<Faculty>({
  resource: 'faculties',
  repository: facultyRepository,
  queue: facultyQueue,
});
