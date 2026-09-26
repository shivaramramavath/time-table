import { DesignerQueue } from '../shared/designer.queue.js';

import type { Edge } from './edge.model.js';

class EdgeQueue extends DesignerQueue<Edge> {
  constructor() {
    super('edge');
  }
}

export const edgeQueue = new EdgeQueue();
