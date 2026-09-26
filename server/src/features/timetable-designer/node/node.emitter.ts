import { BaseEmitter } from '#shared/Base/BaseEmitter.js';
import type { Node } from './node.model.js';

export class NodeEmitter extends BaseEmitter<Node> {
  constructor() {
    super('node');
  }
}

export const nodeEmitter = new NodeEmitter();