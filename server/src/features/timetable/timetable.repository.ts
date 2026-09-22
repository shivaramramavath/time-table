import createHttpError from 'http-errors';
import { getRandomDescription } from './services/descriptions.js';
import { TimetableModel, type TimetableDocument } from './timetable.model.js';

interface GetTimetablesParams {
  userId: string;
  query?: string;
  skip: number;
  limit: number;
}

interface UpdateTimetableData {
  title?: string;
  description?: string;
  stage?: 'incomplete' | 'editing' | 'complete';
}

export const timetableRepository = {
  create: async ({
    title,
    userId,
  }: {
    title: string;
    userId: string;
  }): Promise<TimetableDocument> => {
    try {
      return await TimetableModel.create({
        title,
        userId,
        description: getRandomDescription(),
      });
    } catch (error) {
      throw createHttpError.InternalServerError(
        error instanceof Error ? error.message : 'Failed to create timetable',
      );
    }
  },

  getTimetables: async ({ userId, query = '', skip, limit }: GetTimetablesParams) => {
    try {
      const filter: Record<string, unknown> = {
        userId,
      };

      if (query.trim()) {
        filter.title = {
          $regex: escapeRegex(query.trim()),
          $options: 'i',
        };
      }

      return await TimetableModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
    } catch {
      throw createHttpError.InternalServerError('Failed to get timetables');
    }
  },

  getRecentTimetables: async (userId: string, limit = 5) => {
    try {
      return await TimetableModel.find({
        userId,
      })
        .sort({ updatedAt: -1 })
        .limit(limit)
        .lean();
    } catch {
      throw createHttpError.InternalServerError('Failed to get recent timetables');
    }
  },

  getById: async (timetableId: string, userId: string) => {
    try {
      return await TimetableModel.findOne({
        _id: timetableId,
        userId,
      });
    } catch {
      throw createHttpError.InternalServerError('Failed to get timetable');
    }
  },

  update: async (timetableId: string, userId: string, data: UpdateTimetableData) => {
    try {
      return await TimetableModel.findOneAndUpdate(
        {
          _id: timetableId,
          userId,
        },
        {
          $set: data,
        },
        {
          new: true,
          runValidators: true,
        },
      );
    } catch {
      throw createHttpError.InternalServerError('Failed to update timetable');
    }
  },

  delete: async (timetableId: string, userId: string) => {
    try {
      return await TimetableModel.findOneAndDelete({
        _id: timetableId,
        userId,
      });
    } catch {
      throw createHttpError.InternalServerError('Failed to delete timetable');
    }
  },
};

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
