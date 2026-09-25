import type { FilterQuery, Model, UpdateQuery } from 'mongoose';

export class BaseRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  async create(data: Partial<T>) {
    return this.model.create(data);
  }

  async findById(id: string) {
    return this.model.findById(id).exec();
  }

  async findOne(filter: FilterQuery<T>) {
    return this.model.findOne(filter).exec();
  }

  async find(
    filter: FilterQuery<T> = {},
    options?: {
      skip?: number;
      limit?: number;
      sort?: Record<string, 1 | -1>;
    },
  ) {
    return this.model
      .find(filter)
      .skip(options?.skip ?? 0)
      .limit(options?.limit ?? 0)
      .sort(options?.sort ?? { createdAt: -1 })
      .exec();
  }

  async count(filter: FilterQuery<T> = {}) {
    return this.model.countDocuments(filter).exec();
  }

  async update(id: string, data: UpdateQuery<T>) {
    return this.model
      .findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async delete(id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }
}
