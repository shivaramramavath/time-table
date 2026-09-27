import type { Model, Types } from 'mongoose';

import type { Template } from './template.model.js';
import { BaseRepository } from '#shared/base/base-repository.js';

export class TemplateRepository extends BaseRepository<Template> {
  constructor(private readonly templateModel: Model<Template>) {
    super(templateModel);
  }

  async get(id: string) {
    return this.templateModel.findById(id).lean<Template | null>();
  }

  async getAll(userId: Types.ObjectId | string) {
    return this.templateModel.find({ userId }).sort({ createdAt: -1 }).lean<Template[]>();
  }

  async getPrivate(userId: Types.ObjectId | string) {
    return this.templateModel
      .find({
        userId,
        visibility: 'private',
      })
      .sort({ createdAt: -1 })
      .lean<Template[]>();
  }

  async getPublic() {
    return this.templateModel
      .find({
        visibility: 'public',
      })
      .sort({ createdAt: -1 })
      .lean<Template[]>();
  }
}
