import { EdgeModel, type Edge } from "./edge.model.js";

export const edgeRepository = {
  findById: async (designerId: string, id: string): Promise<Edge | null> => {
    return EdgeModel.findOne({
      designerId,
      id,
    }).lean();
  },

  findAll: async (designerId: string): Promise<Edge[]> => {
    return EdgeModel.find({
      designerId,
    })
      .sort({ createdAt: 1 })
      .lean();
  },

  create: async (edge: Edge): Promise<Edge> => {
    const document = await EdgeModel.create(edge);

    return document.toObject();
  },

  createMany: async (edges: Edge[]): Promise<Edge[]> => {
    return EdgeModel.insertMany(edges);
  },

  update: async (
    designerId: string,
    id: string,
    edge: Edge,
  ): Promise<Edge | null> => {
    return EdgeModel.findOneAndUpdate(
      {
        designerId,
        id,
      },
      {
        $set: edge,
      },
      {
        new: true,
        runValidators: true,
      },
    ).lean();
  },

  delete: async (designerId: string, id: string): Promise<boolean> => {
    const result = await EdgeModel.deleteOne({
      designerId,
      id,
    });

    return result.deletedCount > 0;
  },

  deleteMany: async (designerId: string, ids: string[]): Promise<number> => {
    if (ids.length === 0) {
      return 0;
    }

    const result = await EdgeModel.deleteMany({
      designerId,
      id: {
        $in: ids,
      },
    });

    return result.deletedCount;
  },
};
