import type { Subject } from './subject.model.js';

import { createDesignerEmitter } from '../../timetable-designer/shared/designer.emitter.js';

export const subjectEmitter = createDesignerEmitter<Subject>('subject');
