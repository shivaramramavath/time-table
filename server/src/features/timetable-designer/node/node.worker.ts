import { createDesignerWorker } from "../shared/designer.worker.js";
import { nodeProcessor } from "./node.processor.js";

export const nodeWorker = () =>
  createDesignerWorker("node", nodeProcessor, {
    concurrency: 10,
  });
