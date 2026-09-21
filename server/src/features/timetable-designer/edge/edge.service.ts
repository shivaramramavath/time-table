import { edgeCache } from './edge.cache.js';
import { Edge } from './edge.model.js';

export const edgeService = {
  getById: (designerId: string, edgeId: string) => {
    return edgeCache.getById(designerId, edgeId);
  },

  getAll: (designerId: string) => {
    return edgeCache.getAll(designerId);
  },

  create: (designerId: string, edge: Edge) => {
    return edgeCache.create(designerId, edge);
  },

  createMany: (designerId: string, edges: Edge[]) => {
    return edgeCache.createMany(designerId, edges);
  },

  delete: (designerId: string, edgeId: string) => {
    return edgeCache.deleteById(designerId, edgeId);
  },

  deleteMany: (designerId: string, edgeIds: string[]) => {
    return edgeCache.deleteMany(designerId, edgeIds);
  },
};
