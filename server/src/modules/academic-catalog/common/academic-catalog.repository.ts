import { Model } from 'mongoose';

import { BaseRepository } from '../../../shared/database/repositories/base.repository';

export abstract class AcademicCatalogRepository<
  TEntity,
> extends BaseRepository<TEntity> {
  protected constructor(model: Model<TEntity>) {
    super(model);
  }
}
