import { createDesignerCache } from '../shared/designer-cache.js';
import type { Edge } from './edge.model.js';

import { edgeQueue } from './edge.queue.js';
import { edgeRepository } from './edge.repository.js';

export const edgeCache = createDesignerCache<Edge>({
  resource: 'edges',
  repository: edgeRepository,
  queue: edgeQueue,
});
