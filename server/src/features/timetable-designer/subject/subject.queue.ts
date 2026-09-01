import { createDesignerQueue } from "../shared/designer.queue.js";
import type { Subject } from "./subject.model.js";

export const subjectQueue = createDesignerQueue<Subject>({
  name: "subject",
});
