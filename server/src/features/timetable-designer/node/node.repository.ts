import { NodeModel, type Node } from "./node.model.js";

export const nodeRepository = {
  findById: async (designerId: string, id: string): Promise<Node | null> => {
    return NodeModel.findOne({
      designerId,
      id,
    }).lean();
  },

  findAll: async (designerId: string): Promise<Node[]> => {
    return NodeModel.find({
      designerId,
    })
      .sort({ createdAt: 1 })
      .lean();
  },

  create: async (node: Node): Promise<Node> => {
    const document = await NodeModel.create(node);

    return document.toObject();
  },

  createMany: async (nodes: Node[]): Promise<Node[]> => {
    return NodeModel.insertMany(nodes);
  },

  update: async (
    designerId: string,
    id: string,
    data: Partial<Node>,
  ): Promise<Node | null> => {
    return NodeModel.findOneAndUpdate(
      {
        designerId,
        id,
      },
      {
        $set: data,
      },
      {
        new: true,
        runValidators: true,
      },
    ).lean();
  },

  delete: async (designerId: string, id: string): Promise<boolean> => {
    const result = await NodeModel.deleteOne({
      designerId,
      id,
    });

    return result.deletedCount > 0;
  },

  deleteMany: async (designerId: string, ids: string[]): Promise<number> => {
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
  },
};
