import type { Faculty } from './faculty.model.js';

import { createDesignerEmitter } from '../shared/designer.emitter.js';

export const facultyEmitter = createDesignerEmitter<Faculty>('faculty');
