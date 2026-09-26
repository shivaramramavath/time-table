import type { Node } from './node.model.js';

import { NodeCache, nodeCache } from './node.cache.js';

export class NodeService {
  constructor(private readonly nodeCache: NodeCache) {}

  async getById(designerId: string, nodeId: string) {
    return this.nodeCache.getById(designerId, nodeId);
  }

  async getAll(designerId: string) {
    return this.nodeCache.getAll(designerId);
  }

  async create(designerId: string, node: Node) {
    return this.nodeCache.create(designerId, node);
  }

  async createMany(designerId: string, nodes: Node[]) {
    return this.nodeCache.createMany(designerId, nodes);
  }

  async update(designerId: string, nodeId: string, data: Partial<Node>) {
    return this.nodeCache.updateById(designerId, nodeId, data);
  }

  async delete(designerId: string, nodeId: string) {
    return this.nodeCache.deleteById(designerId, nodeId);
  }

  async deleteMany(designerId: string, nodeIds: string[]) {
    return this.nodeCache.deleteMany(designerId, nodeIds);
  }
}

export const nodeService = new NodeService(nodeCache);
