import { BaseWorker } from '#shared/base/base-worker.js';

import type { Edge } from './edge.model.js';
import { edgeProcessor, EdgeProcess } from './edge.process.js';

class EdgeWorker extends BaseWorker<Edge> {
  constructor(queueName: string, edgeProcessor: EdgeProcess) {
    super(queueName, edgeProcessor);
  }
}

export const edgeWorker = new EdgeWorker('edge', edgeProcessor);
