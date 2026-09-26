import { DesignerProcess, type DesignerRepository } from '../shared/designer.process.js';

import type { Edge } from './edge.model.js';
import { edgeRepository } from './edge.repository.js';

class EdgeProcess extends DesignerProcess<Edge> {
  constructor(repository: DesignerRepository<Edge> = edgeRepository) {
    super(repository);
  }
}

export const edgeProcess = new EdgeProcess();
