import { createDesignerQueue } from "../shared/designer.queue.js";
import type { Node } from "./node.model.js";

export const nodeQueue = createDesignerQueue<Node>({
  name: "node",
});
