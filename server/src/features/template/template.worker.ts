import { BaseWorker } from '#shared/Base/BaseWorker.js';

import type { TemplateJobData } from './template.queue.js';
import { TemplateProcess } from './template.process.js';

import { templateRepository } from './template.dependency.js';

export class TemplateWorker extends BaseWorker<TemplateJobData> {
  constructor(templateProcess: TemplateProcess, concurrency = 5) {
    super('template', templateProcess, concurrency);
  }
}

export const templateWorker = new TemplateWorker(new TemplateProcess(templateRepository));
