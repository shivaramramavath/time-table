import { BaseQueue } from '#shared/base/base-queue.js';

import type { Edge } from './edge.model.js';

export interface EdgeJob {
  edge: Edge;
}

export class EdgeQueue extends BaseQueue<Edge> {
  constructor(queueName: string) {
    super(queueName);
  }

  add(edge: Edge) {
    return super.add('edge:create', edge);
  }

  update(edge: Edge) {
    return super.add('edge:update', edge);
  }

  delete(edge: Edge) {
    return super.add('edge:delete', edge);
  }
}

export const edgeQueue = new EdgeQueue('edge');
