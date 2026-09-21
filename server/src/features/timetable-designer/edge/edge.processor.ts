import type { Edge } from './edge.model.js';

import { edgeRepository } from './edge.repository.js';

export const edgeProcessor = {
  add: async (edge: Edge) => {
    return edgeRepository.create(edge);
  },

  addMany: async (edges: Edge[]) => {
    return edgeRepository.createMany(edges);
  },

  update: async (edge: Edge) => {
    return edgeRepository.update(edge.designerId, edge.id, edge);
  },

  remove: async (designerId: string, id: string) => {
    return edgeRepository.delete(designerId, id);
  },

  removeMany: async (designerId: string, ids: string[]) => {
    return edgeRepository.deleteMany(designerId, ids);
  },
};
