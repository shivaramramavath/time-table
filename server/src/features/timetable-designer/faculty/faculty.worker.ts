import { createDesignerWorker } from "../shared/designer.worker.js";
import { facultyProcessor } from "./faculty.processor.js";

export const facultyWorker = () =>
  createDesignerWorker("faculty", facultyProcessor);
