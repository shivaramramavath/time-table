import { BaseQueue } from '#shared/base/base-queue.js';
import type { Node } from './node.model.js';

export interface NodeJob {
  node: Node;
}

export class NodeQueue extends BaseQueue<Node> {
  constructor(queueName: string) {
    super(queueName);
  }

  add(node: Node) {
    return super.add('node:create', node);
  }

  update(node: Node) {
    return super.add('node:update', node);
  }

  delete(node: Node) {
    return super.add('node:delete', node);
  }
}

export const nodeQueue = new NodeQueue('node');
