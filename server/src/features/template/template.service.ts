import { Types } from 'mongoose';

import type { Template } from './template.model.js';
import { TemplateRepository } from './template.repository.js';

const isOwner = (template: Template, userId: string | Types.ObjectId) => {
  return template.userId.toString() === userId.toString();
};

export class TemplateService {
  constructor(private readonly templateRepository: TemplateRepository) {}

  async get(id: string, userId?: string) {
    const template = await this.templateRepository.get(id);

    if (!template) {
      throw new Error('Template not found');
    }

    if (template.visibility === 'private' && (!userId || !isOwner(template, userId))) {
      throw new Error('You do not have access to this template');
    }

    return template;
  }

  async getAll(userId: string) {
    return this.templateRepository.getAll(userId);
  }

  async getPrivate(userId: string) {
    return this.templateRepository.getPrivate(userId);
  }

  async getPublic() {
    return this.templateRepository.getPublic();
  }

  async create(
    designerId: string,
    { userId, name = 'util', description = 'desc', visibility = 'private' }: Partial<Template>,
  ) {
    return this.templateRepository.create({
      userId,
      name,
      description,
      visibility,
    });
  }

  async update(id: string, userId: string, data: Partial<Template>) {
    const template = await this.templateRepository.get(id);

    if (!template) {
      throw new Error('Template not found');
    }

    if (!isOwner(template, userId)) {
      throw new Error('You are not allowed to update this template');
    }

    delete data.userId;

    const updatedTemplate = await this.templateRepository.update(id, data);

    if (!updatedTemplate) {
      throw new Error('Failed to update template');
    }

    return updatedTemplate;
  }

  async remove(id: string, userId: string) {
    const template = await this.templateRepository.get(id);

    if (!template) {
      throw new Error('Template not found');
    }

    if (!isOwner(template, userId)) {
      throw new Error('You are not allowed to delete this template');
    }

    const deletedTemplate = await this.templateRepository.remove(id);

    if (!deletedTemplate) {
      throw new Error('Failed to delete template');
    }

    return deletedTemplate;
  }
}
