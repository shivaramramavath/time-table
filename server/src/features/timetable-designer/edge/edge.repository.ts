import { BaseRepository } from '#shared/base/base-repository.js';

import { EdgeModel, type Edge } from './edge.model.js';

export class EdgeRepository extends BaseRepository<Edge> {
  constructor() {
    super(EdgeModel);
  }

  async createMany(edges: Edge[]): Promise<Edge[]> {
    return this.model.insertMany(edges);
  }

  async deleteMany(designerId: string, ids: string[]): Promise<number> {
    if (!ids.length) {
      return 0;
    }

    const result = await this.model.deleteMany({
      designerId,
      id: {
        $in: ids,
      },
    });

    return result.deletedCount;
  }
}

export const edgeRepository = new EdgeRepository();
