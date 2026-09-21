import type { Node } from './node.model.js';

import { createDesignerEmitter } from '../shared/designer.emitter.js';

export const nodeEmitter = createDesignerEmitter<Node>('node');
