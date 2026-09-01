import { createDesignerQueue } from "../shared/designer.queue.js";
import type { Edge } from "./edge.model.js";

export const edgeQueue = createDesignerQueue<Edge>({
  name: "edge",
});
