import createHttpError from 'http-errors';

import { TimetableModel, type Timetable } from './timetable.model.js';
import { BaseRepository } from '#shared/Base/BaseRepository.js';

interface GetTimetablesParams {
  userId: string;
  query?: string;
  skip: number;
  limit: number;
}

export class TimetableRepository extends BaseRepository<Timetable> {
  constructor() {
    super(TimetableModel);
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

      return await this.find(filter, { skip, limit, sort: { createdAt: -1 } });
    } catch {
      throw createHttpError.InternalServerError('Failed to get timetables');
    }
  }

  async getRecentTimetables(userId: string, limit = 5) {
    try {
      return await this.find({ userId }, { limit, sort: { createdAt: -1 } });
    } catch {
      throw createHttpError.InternalServerError('Failed to get recent timetables');
    }
  }

  async getById(timetableId: string, userId: string) {
    try {
      return await this.findOne({ _id: timetableId, userId });
    } catch {
      throw createHttpError.InternalServerError('Failed to get timetable');
    }
  }

  private escapeRegex(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

export const timetableRepository = new TimetableRepository();
