import { createDesignerCache } from "../shared/designer-cache.js";
import type { Node } from "./node.model.js";

import { nodeQueue } from "./node.queue.js";
import { nodeRepository } from "./node.repository.js";

export const nodeCache = createDesignerCache<Node>({
  resource: "nodes",
  repository: nodeRepository,
  queue: nodeQueue,
});
