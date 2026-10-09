import type { Edge } from './edge.model.js';
import { EdgeCache } from './edge.cache.js';
import { edgeCache } from './edge.cache.js';

export class EdgeService {
  constructor(private readonly edgeCache: EdgeCache) {}

  async getById(designerId: string, edgeId: string) {
    return this.edgeCache.getById(designerId, edgeId);
  }

  async getAll(designerId: string) {
    return this.edgeCache.getAll(designerId);
  }

  async create(designerId: string, edge: Edge) {
    return this.edgeCache.create(designerId, edge);
  }

  async createMany(designerId: string, edges: Edge[]) {
    return this.edgeCache.createMany(designerId, edges);
  }

  async update(designerId: string, edgeId: string, data: Partial<Edge>) {
    return this.edgeCache.updateById(designerId, edgeId, data);
  }

  async delete(designerId: string, edgeId: string) {
    return this.edgeCache.deleteById(designerId, edgeId);
  }

  async deleteMany(designerId: string, edgeIds: string[]) {
    return this.edgeCache.deleteMany(designerId, edgeIds);
  }
}

export const edgeService = new EdgeService(edgeCache);
