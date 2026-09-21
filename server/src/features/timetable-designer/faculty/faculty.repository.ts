import { FacultyModel, type Faculty } from './faculty.model.js';

export const facultyRepository = {
  findById: async (designerId: string, id: string): Promise<Faculty | null> => {
    return FacultyModel.findOne({
      designerId,
      id,
    }).lean();
  },

  findAll: async (designerId: string): Promise<Faculty[]> => {
    return FacultyModel.find({
      designerId,
    })
      .sort({ createdAt: 1 })
      .lean();
  },

  findByEmail: async (designerId: string, email: string): Promise<Faculty | null> => {
    return FacultyModel.findOne({
      designerId,
      email: email.toLowerCase(),
    }).lean();
  },

  create: async (faculty: Faculty): Promise<Faculty> => {
    const document = await FacultyModel.create(faculty);

    return document.toObject();
  },

  createMany: async (faculties: Faculty[]): Promise<Faculty[]> => {
    return FacultyModel.insertMany(faculties);
  },

  update: async (designerId: string, id: string, faculty: Faculty): Promise<Faculty | null> => {
    return FacultyModel.findOneAndUpdate(
      {
        designerId,
        id,
      },
      {
        $set: faculty,
      },
      {
        new: true,
        runValidators: true,
      },
    ).lean();
  },

  delete: async (designerId: string, id: string): Promise<boolean> => {
    const result = await FacultyModel.deleteOne({
      designerId,
      id,
    });

    return result.deletedCount > 0;
  },

  deleteMany: async (designerId: string, ids: string[]): Promise<number> => {
    if (ids.length === 0) {
      return 0;
    }

    const result = await FacultyModel.deleteMany({
      designerId,
      id: {
        $in: ids,
      },
    });

    return result.deletedCount;
  },
};
