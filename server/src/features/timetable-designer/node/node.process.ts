import { DesignerProcess } from '../shared/designer.process.js';
import type { Node } from './node.model.js';

import { nodeRepository } from './node.repository.js';

class NodeProcess extends DesignerProcess<Node> {
  constructor(private readonly repository: DesignerProcess<Node>) {
    super(repository);
  }
}

export const nodeProcessor = new NodeProcess(nodeRepository);
