import { Logger, NotFoundException } from '@nestjs/common';
import { Model, QueryFilter, UpdateQuery } from 'mongoose';

export abstract class BaseRepository<TEntity> {
  protected readonly logger = new Logger(this.constructor.name);

  protected constructor(protected readonly model: Model<TEntity>) {}

  async findById(id: string) {
    try {
      const result = await this.model.findById(id).exec();

      if (!result) {
        throw new NotFoundException();
      }

      return result;
    } catch (error) {
      this.handleError('findById', error);
    }
  }

  async findOne(filter: QueryFilter<TEntity>) {
    try {
      const result = await this.model.findOne(filter).exec();
      if (!result) {
        throw new NotFoundException();
      }

      return result;
    } catch (error) {
      this.handleError('findOne', error);
    }
  }

  async findMany(filter: QueryFilter<TEntity> = {}) {
    try {
      console.log(filter);
      return await this.model.find(filter).exec();
    } catch (error) {
      this.handleError('findMany', error);
    }
  }

  async create(data: Partial<TEntity>) {
    try {
      return await this.model.create(data);
    } catch (error) {
      this.handleError('create', error);
    }
  }

  async updateById(id: string, update: UpdateQuery<TEntity>) {
    try {
      return await this.model
        .findByIdAndUpdate(id, update, {
          new: true,
          runValidators: true,
        })
        .exec();
    } catch (error) {
      this.handleError('updateById', error);
    }
  }

  async deleteById(id: string) {
    try {
      return await this.model.findByIdAndDelete(id).exec();
    } catch (error) {
      this.handleError('deleteById', error);
    }
  }

  protected handleError(operation: string, error: unknown): never {
    this.logger.error(
      `${operation} failed`,
      error instanceof Error ? error.stack : undefined,
    );

    throw error;
  }
}
