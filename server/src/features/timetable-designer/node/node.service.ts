import { nodeCache } from './node.cache.js';

export const nodeService = {
  getById: (designerId: string, nodeId: string) => {
    return nodeCache.getById(designerId, nodeId);
  },

  getAll: (designerId: string) => {
    return nodeCache.getAll(designerId);
  },

  create: (designerId: string, node: Node) => {
    return nodeCache.create(designerId, node);
  },

  createMany: (designerId: string, nodes: Node[]) => {
    return nodeCache.createMany(designerId, nodes);
  },

  update: (designerId: string, nodeId: string, data: Partial<Node>) => {
    return nodeCache.updateById(designerId, nodeId, data);
  },

  delete: (designerId: string, nodeId: string) => {
    return nodeCache.deleteById(designerId, nodeId);
  },

  deleteMany: (designerId: string, nodeIds: string[]) => {
    return nodeCache.deleteMany(designerId, nodeIds);
  },
};
