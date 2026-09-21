import type { Node } from './node.model.js';

import { nodeRepository } from './node.repository.js';

export const nodeProcessor = {
  add: async (node: Node) => {
    return nodeRepository.create(node);
  },

  addMany: async (nodes: Node[]) => {
    return nodeRepository.createMany(nodes);
  },

  update: async (node: Node) => {
    return nodeRepository.update(node.designerId, node.id, node);
  },

  remove: async (designerId: string, id: string) => {
    return nodeRepository.delete(designerId, id);
  },

  removeMany: async (designerId: string, ids: string[]) => {
    return nodeRepository.deleteMany(designerId, ids);
  },
};
