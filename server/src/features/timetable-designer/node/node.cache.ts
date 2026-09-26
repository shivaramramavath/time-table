import { BaseObjectCache } from '#shared/Base/BaseObjectCache.js';

import type { Node } from './node.model.js';
import { nodeQueue, NodeQueue } from './node.queue.js';
import { NodeRepository, nodeRepository } from './node.repository.js';

export class NodeCache extends BaseObjectCache {
  constructor(
    private readonly queue: NodeQueue,
    private readonly repository: NodeRepository,
  ) {
    super('node');
  }

  private designerKey(designerId: string): string {
    return `designer:${designerId}:node`;
  }

  async getById(designerId: string, nodeId: string): Promise<Node | null> {
    const key = this.designerKey(designerId);

    const cached = await this.get<Node>(key, nodeId);

    if (cached) {
      return cached;
    }

    const node = await this.repository.findById(designerId);

    if (!node) {
      return null;
    }

    await this.set(key, nodeId, node);

    return node;
  }

  async getAll(designerId: string): Promise<Node[]> {
    const key = this.designerKey(designerId);

    const cached = await this.getAll<Node>(key);

    if (cached.length) {
      return cached;
    }

    const nodes = await this.repository.findAll(designerId);

    if (!nodes.length) {
      return [];
    }

    await this.setMany(
      key,
      nodes.map((node: Node) => ({
        key: node.id,
        value: node,
      })),
    );

    return nodes;
  }

  async create(designerId: string, node: Node): Promise<Node> {
    const newNode: Node = {
      ...node,
      designerId,
    };

    await this.set(this.designerKey(designerId), newNode.id, newNode);

    await this.queue.add(designerId, newNode);

    return newNode;
  }

  async createMany(designerId: string, nodes: Node[]): Promise<Node[]> {
    if (!nodes.length) {
      return [];
    }

    const newNodes = nodes.map((node) => ({
      ...node,
      designerId,
    }));

    await this.setMany(
      this.designerKey(designerId),
      newNodes.map((node) => ({
        key: node.id,
        value: node,
      })),
    );

    await this.queue.addMany(designerId, newNodes);

    return newNodes;
  }

  async updateById(designerId: string, nodeId: string, data: Partial<Node>): Promise<Node | null> {
    const existing = await this.getById(designerId, nodeId);

    if (!existing) {
      return null;
    }

    const updatedNode: Node = {
      ...existing,
      ...data,
      id: nodeId,
      designerId,
    };

    await this.set(this.designerKey(designerId), nodeId, updatedNode);

    await this.queue.update(updatedNode);

    return updatedNode;
  }

  async deleteById(designerId: string, nodeId: string): Promise<boolean> {
    await this.delete(this.designerKey(designerId), nodeId);

    await this.queue.remove(designerId, nodeId);

    return true;
  }

  async deleteMany(designerId: string, nodeIds: string[]): Promise<number> {
    if (!nodeIds.length) {
      return 0;
    }

    const deleted = await this.deleteMany(this.designerKey(designerId), nodeIds);

    await this.queue.removeMany(designerId, nodeIds);

    return deleted;
  }
}

export const nodeCache = new NodeCache(nodeQueue, nodeRepository);
