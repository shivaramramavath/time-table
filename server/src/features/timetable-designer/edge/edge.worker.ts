import { BaseWorker } from '#shared/Base/BaseWorker.js';

import type { Edge } from './edge.model.js';
import { edgeProcess } from './edge.process.js';

class EdgeWorker extends BaseWorker<Edge> {
  constructor() {
    super('edge', edgeProcess);
  }
}

export const edgeWorker = new EdgeWorker();
