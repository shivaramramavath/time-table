import { Logger, NotFoundException } from '@nestjs/common';
import { Model, QueryFilter, SortOrder, UpdateQuery } from 'mongoose';

export abstract class BaseRepository<TEntity> {
  protected readonly logger = new Logger(this.constructor.name);

  protected constructor(protected readonly model: Model<TEntity>) {}

  async findById(id: string) {
    try {
      const result = await this.model.findById(id).exec();

      if (!result) {
        throw new NotFoundException(
          `${this.model.modelName} with ID "${id}" not found`,
        );
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
        throw new NotFoundException(`${this.model.modelName} not found`);
      }

      return result;
    } catch (error) {
      this.handleError('findOne', error);
    }
  }

  async findMany(
    filter: QueryFilter<TEntity> = {},
    page = 1,
    sort: Record<string, SortOrder> = { createdAt: -1 },
    limit = 20,
  ) {
    try {
      page = Math.max(1, Math.floor(page));
      limit = Math.min(100, Math.max(1, Math.floor(limit)));

      // Add a unique tie-breaker for stable pagination.
      const stableSort = { ...sort };

      if (!('_id' in stableSort)) {
        stableSort._id = 1;
      }

      const offset = (page - 1) * limit;

      const [data, total] = await Promise.all([
        this.model
          .find(filter)
          .sort(stableSort)
          .skip(offset)
          .limit(limit)
          .exec(),
        this.model.countDocuments(filter).exec(),
      ]);

      return {
        data,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          hasNextPage: page * limit < total,
          hasPreviousPage: page > 1,
        },
      };
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
      const result = await this.model
        .findByIdAndUpdate(id, update, {
          new: true,
          runValidators: true,
        })
        .exec();

      if (!result) {
        throw new NotFoundException(
          `${this.model.modelName} with ID "${id}" not found`,
        );
      }

      return result;
    } catch (error) {
      this.handleError('updateById', error);
    }
  }

  async deleteById(id: string) {
    try {
      const result = await this.model.findByIdAndDelete(id).exec();

      if (!result) {
        throw new NotFoundException(
          `${this.model.modelName} with ID "${id}" not found`,
        );
      }

      return result;
    } catch (error) {
      this.handleError('deleteById', error);
    }
  }

  protected handleError(operation: string, error: unknown): never {
    // Not-found is an expected application outcome, not a server error.
    if (error instanceof NotFoundException) {
      throw error;
    }

    this.logger.error(
      `${operation} failed`,
      error instanceof Error ? error.stack : undefined,
    );

    throw error;
  }
}
