import { createDesignerWorker } from "../shared/designer.worker.js";
import { subjectProcessor } from "./subject.processor.js";

export const subjectWorker = () =>
  createDesignerWorker("subject", subjectProcessor);
