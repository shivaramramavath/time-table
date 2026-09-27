import { BaseEmitter } from '#shared/base/base-emitter.js';

import type { Edge } from './edge.model.js';

export class EdgeEmitter extends BaseEmitter<Edge> {
  constructor() {
    super('edge');
  }
}

export const edgeEmitter = new EdgeEmitter();
