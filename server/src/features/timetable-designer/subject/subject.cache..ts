import { createDesignerCache } from "../shared/designer-cache.js";
import { Subject } from "./subject.model.js";

import { subjectQueue } from "./subject.queue.js";
import { subjectRepository } from "./subject.repository.js";

export const subjectCache = createDesignerCache<Subject>({
  resource: "subjects",
  repository: subjectRepository,
  queue: subjectQueue,
});
