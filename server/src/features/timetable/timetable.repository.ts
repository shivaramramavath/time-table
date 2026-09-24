import createHttpError from 'http-errors';

import { CreateTimetableDto } from './dtos/create.dto.js';
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

class TimetableRepository {
  async create({ title, userId, description }: CreateTimetableDto): Promise<TimetableDocument> {
    try {
      return await TimetableModel.create({
        title,
        userId,
        description,
      });
    } catch (error) {
      throw createHttpError.InternalServerError(
        error instanceof Error ? error.message : 'Failed to create timetable',
      );
    }
  }

  async getTimetables({ userId, query = '', skip, limit }: GetTimetablesParams) {
    try {
      const filter: Record<string, unknown> = {
        userId,
      };

      if (query.trim()) {
        filter.title = {
          $regex: this.escapeRegex(query.trim()),
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
  }

  async getRecentTimetables(userId: string, limit = 5) {
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
  }

  async getById(timetableId: string, userId: string) {
    try {
      return await TimetableModel.findOne({
        _id: timetableId,
        userId,
      });
    } catch {
      throw createHttpError.InternalServerError('Failed to get timetable');
    }
  }

  async update(timetableId: string, userId: string, data: UpdateTimetableData) {
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
  }

  async delete(timetableId: string, userId: string) {
    try {
      return await TimetableModel.findOneAndDelete({
        _id: timetableId,
        userId,
      });
    } catch {
      throw createHttpError.InternalServerError('Failed to delete timetable');
    }
  }

  private escapeRegex(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

export const timetableRepository = new TimetableRepository();