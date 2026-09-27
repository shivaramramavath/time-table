import { BaseRepository } from '#shared/base/base-repository.js';
import { Model } from 'mongoose';
import { NodeModel, type Node } from './node.model.js';

export class NodeRepository extends BaseRepository<Node> {
  constructor(protected readonly model: Model<Node>) {
    super(model);
  }

  async createMany(nodes: Node[]): Promise<Node[]> {
    return NodeModel.insertMany(nodes);
  }

  async deleteMany(designerId: string, ids: string[]): Promise<number> {
    if (ids.length === 0) {
      return 0;
    }

    const result = await NodeModel.deleteMany({
      designerId,
      id: {
        $in: ids,
      },
    });

    return result.deletedCount;
  }
}

export const nodeRepository = new NodeRepository(NodeModel);
