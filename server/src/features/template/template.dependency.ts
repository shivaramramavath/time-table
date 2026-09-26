import { TemplateModel } from './template.model.js';
import { TemplateRepository } from './template.repository.js';
import { TemplateService } from './template.service.js';
import { TemplateController } from './template.controller.js';

export const templateRepository = new TemplateRepository(TemplateModel);

export const templateService = new TemplateService(templateRepository);

export const templateController = new TemplateController(templateService);
