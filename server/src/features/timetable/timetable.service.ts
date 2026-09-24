import createHttpError from 'http-errors';

import { timetableDesignerService } from '#features/timetable-designer/timetable-designer.service.js';

import { timetableRepository } from './timetable.repository.js';
import { CreateTimetableDto } from './dtos/create.dto.js';

interface GetTimetablesParams {
  userId: string;
  page: number;
  query?: string;
}

interface UpdateTimetableData {
  title?: string;
  description?: string;
  stage?: 'incomplete' | 'editing' | 'complete';
}

export class TimetableService {
  async create({ userId, title, description }: CreateTimetableDto) {
    const timetable = await timetableRepository.create({
      title,
      description,
      userId,
    });

    await timetableDesignerService.create(timetable._id.toString());

    return timetable;
  }

  async getTimetables({ userId, page, query }: GetTimetablesParams) {
    const limit = 20;
    const skip = (page - 1) * limit;

    return timetableRepository.getTimetables({
      userId,
      query,
      skip,
      limit,
    });
  }

  async getRecentTimetables(userId: string) {
    return timetableRepository.getRecentTimetables(userId, 5);
  }

  async get(timetableId: string, userId: string) {
    return timetableRepository.getById(timetableId, userId);
  }

  async generate({ timetableId, userId }: { timetableId: string; userId: string }) {
    const timetable = await timetableRepository.getById(timetableId, userId);

    if (!timetable) {
      throw createHttpError.NotFound('Timetable not found');
    }

    const updatedTimetable = await timetableRepository.update(timetableId, userId, {
      stage: 'complete',
    });

    return updatedTimetable;
  }

  async update(timetableId: string, userId: string, data: UpdateTimetableData) {
    return timetableRepository.update(timetableId, userId, data);
  }

  async delete(timetableId: string, userId: string) {
    return timetableRepository.delete(timetableId, userId);
  }
}

export const timetableService = new TimetableService();
