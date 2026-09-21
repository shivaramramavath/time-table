import type { Model, Types } from 'mongoose';

import type { Template } from './template.model.js';

export class TemplateRepository {
  constructor(private readonly templateModel: Model<Template>) {}

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

  async create({ userId, name, description, visibility = 'private' }: Partial<Template>) {
    return this.templateModel.create({
      userId,
      name,
      description,
      visibility,
    });
  }

  async update(id: string, data: Partial<Template>) {
    return this.templateModel
      .findByIdAndUpdate(
        id,
        { $set: data },
        {
          new: true,
          runValidators: true,
        },
      )
      .lean<Template | null>();
  }

  async remove(id: string) {
    return this.templateModel.findByIdAndDelete(id).lean<Template | null>();
  }
}
