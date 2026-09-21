import { SubjectModel, type Subject } from './subject.model.js';

export const subjectRepository = {
  findById: async (designerId: string, id: string): Promise<Subject | null> => {
    return SubjectModel.findOne({
      designerId,
      id,
    })
      .lean()
      .exec();
  },

  findAll: async (designerId: string): Promise<Subject[]> => {
    return SubjectModel.find({
      designerId,
    })
      .sort({ createdAt: 1 })
      .lean()
      .exec();
  },

  findByCode: async (designerId: string, code: string): Promise<Subject | null> => {
    return SubjectModel.findOne({
      designerId,
      code: code.toUpperCase(),
    })
      .lean()
      .exec();
  },

  create: async (subject: Subject): Promise<Subject> => {
    const document = await SubjectModel.create(subject);

    return document.toObject();
  },

  createMany: async (subjects: Subject[]): Promise<Subject[]> => {
    return SubjectModel.insertMany(subjects);
  },

  update: async (
    designerId: string,
    id: string,
    data: Partial<Subject>,
  ): Promise<Subject | null> => {
    return SubjectModel.findOneAndUpdate(
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
    )
      .lean()
      .exec();
  },

  delete: async (designerId: string, id: string): Promise<boolean> => {
    const result = await SubjectModel.deleteOne({
      designerId,
      id,
    });

    return result.deletedCount > 0;
  },

  deleteMany: async (designerId: string, ids: string[]): Promise<number> => {
    if (ids.length === 0) {
      return 0;
    }

    const result = await SubjectModel.deleteMany({
      designerId,
      id: {
        $in: ids,
      },
    });

    return result.deletedCount;
  },
};
