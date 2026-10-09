import { BaseEmitter } from '#shared/base/base-emitter.js';
import type { Node } from './node.model.js';

export class NodeEmitter extends BaseEmitter<Node> {
  constructor() {
    super('node');
  }
}

export const nodeEmitter = new NodeEmitter();
