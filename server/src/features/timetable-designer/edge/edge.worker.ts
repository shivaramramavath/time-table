import { createDesignerWorker } from "../shared/designer.worker.js";
import { edgeProcessor } from "./edge.processor.js";

export const edgeWorker = () => createDesignerWorker("edge", edgeProcessor);
