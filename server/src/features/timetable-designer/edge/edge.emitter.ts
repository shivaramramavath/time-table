import type { Edge } from './edge.model.js';

import { createDesignerEmitter } from '../shared/designer.emitter.js';

export const edgeEmitter = createDesignerEmitter<Edge>('edge');
