import type { UpdateQuery } from 'mongoose';

import { AcademicCatalogRepository } from './academic-catalog.repository';

export abstract class AcademicCatalogService<TEntity> {
  protected constructor(
    protected readonly repository: AcademicCatalogRepository<TEntity>,
  ) {}

  async getById(id: string) {
    return this.repository.findById(id);
  }

  async create(userId: string, data: Partial<TEntity>) {
    return this.repository.create({ ...data, userId });
  }

  async update(id: string, data: UpdateQuery<TEntity>) {
    return this.repository.updateById(id, data);
  }

  async delete(id: string) {
    return this.repository.deleteById(id);
  }
}
