import { DesignerQueue } from '../shared/designer.queue.js';
import type { Node } from './node.model.js';

class NodeQueue extends DesignerQueue<Node> {}

export const nodeQueue = new NodeQueue('node');
