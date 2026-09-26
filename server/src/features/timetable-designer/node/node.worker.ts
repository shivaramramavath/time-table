import { BaseWorker } from '#shared/Base/BaseWorker.js';
import { Node } from './node.model.js';
import { nodeProcessor } from './node.process.js';

class NodeWorker extends BaseWorker<Node> {
  constructor(queueName, nodeProcessor) {
    super(queueName, nodeProcessor);
  }
}

export const nodeWorker = new NodeWorker('node', nodeProcessor);
