import { BaseObjectCache } from '#shared/base/base-object-cache.js';

import type { Edge } from './edge.model.js';
import { edgeQueue, EdgeQueue } from './edge.queue.js';
import { EdgeRepository, edgeRepository } from './edge.repository.js';

export class EdgeCache extends BaseObjectCache {
  constructor(
    private readonly queue: EdgeQueue,
    private readonly repository: EdgeRepository,
  ) {
    super('edge');
  }

  private designerKey(designerId: string): string {
    return `designer:${designerId}:edge`;
  }

  async getById(designerId: string, edgeId: string): Promise<Edge | null> {
    const key = this.designerKey(designerId);

    const cached = await this.get<Edge>(key, edgeId);

    if (cached) {
      return cached;
    }

    const edge = await this.repository.findById(designerId, edgeId);

    if (!edge) {
      return null;
    }

    await this.set(key, edgeId, edge);

    return edge;
  }

  async getAll(designerId: string): Promise<Edge[]> {
    const key = this.designerKey(designerId);

    const cached = await super.getAll<Edge>(key);

    if (cached.length) {
      return cached;
    }

    const edges = await this.repository.findAll(designerId);

    if (!edges.length) {
      return [];
    }

    await this.setMany(
      key,
      edges.map((edge) => ({
        key: edge.id,
        value: edge,
      })),
    );

    return edges;
  }

  async create(designerId: string, edge: Edge): Promise<Edge> {
    const newEdge: Edge = {
      ...edge,
      designerId,
    };

    await this.set(this.designerKey(designerId), newEdge.id, newEdge);

    await this.queue.add(designerId, newEdge);

    return newEdge;
  }

  async createMany(designerId: string, edges: Edge[]): Promise<Edge[]> {
    if (!edges.length) {
      return [];
    }

    const newEdges = edges.map((edge) => ({
      ...edge,
      designerId,
    }));

    await this.setMany(
      this.designerKey(designerId),
      newEdges.map((edge) => ({
        key: edge.id,
        value: edge,
      })),
    );

    await this.queue.addMany(designerId, newEdges);

    return newEdges;
  }

  async updateById(designerId: string, edgeId: string, data: Partial<Edge>): Promise<Edge | null> {
    const existing = await this.getById(designerId, edgeId);

    if (!existing) {
      return null;
    }

    const updatedEdge: Edge = {
      ...existing,
      ...data,
      id: edgeId,
      designerId,
    };

    await this.set(this.designerKey(designerId), edgeId, updatedEdge);

    await this.queue.update(updatedEdge);

    return updatedEdge;
  }

  async deleteById(designerId: string, edgeId: string): Promise<boolean> {
    await this.delete(this.designerKey(designerId), edgeId);

    await this.queue.remove(designerId, edgeId);

    return true;
  }

  async deleteMany(designerId: string, edgeIds: string[]): Promise<number> {
    if (!edgeIds.length) {
      return 0;
    }

    const deleted = await super.deleteMany(this.designerKey(designerId), edgeIds);

    await this.queue.removeMany(designerId, edgeIds);

    return deleted;
  }
}

export const edgeCache = new EdgeCache(edgeQueue, edgeRepository);
