import type { Subject } from "./subject.model.js";

import { createDesignerEmitter } from "../shared/designer.emitter.js";

export const subjectEmitter = createDesignerEmitter<Subject>("subject");
