import { createDesignerQueue } from '../shared/designer.queue.js';
import type { Faculty } from './faculty.model.js';

export const facultyQueue = createDesignerQueue<Faculty>({
  name: 'faculty',
});
