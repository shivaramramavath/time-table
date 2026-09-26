import { BaseEmitter } from '#shared/Base/BaseEmitter.js';

import type { Edge } from './edge.model.js';

export class EdgeEmitter extends BaseEmitter<Edge> {
  constructor() {
    super('edge');
  }
}

export const edgeEmitter = new EdgeEmitter();
