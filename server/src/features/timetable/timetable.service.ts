import createHttpError from 'http-errors';

import {
  timetableDesignerService,
  TimetableDesignerService,
} from '#features/timetable-designer/timetable-designer.service.js';

import { TimetableRepository, timetableRepository } from './timetable.repository.js';
import { CreateTimetableDto } from './dtos/create.dto.js';

interface GetTimetablesParams {
  userId: string;
  page: number;
  query?: string;
}

interface UpdateTimetableData {
  title?: string;
  description?: string;
  stage?: 'draft' | 'editing' | 'complete' | 'published' | 'archived';
}

export class TimetableService {
  constructor(
    private readonly timetableRepository = TimetableRepository,
    private readonly timetableDesignerService = TimetableDesignerService,
  ) {}

  async create({ userId, title, description }: CreateTimetableDto) {
    const timetable = await this.timetableRepository.create({
      title,
      description,
      userId,
    });

    await this.timetableDesignerService.create(timetable._id.toString());

    return timetable;
  }

  async getTimetables({ userId, page, query }: GetTimetablesParams) {
    const limit = 20;
    const skip = (page - 1) * limit;

    return this.timetableRepository.getTimetables({
      userId,
      query,
      skip,
      limit,
    });
  }

  async getRecentTimetables(userId: string) {
    return this.timetableRepository.getRecentTimetables(userId, 5);
  }

  async get(timetableId: string, userId: string) {
    return this.timetableRepository.getById(timetableId, userId);
  }

  async generate({ timetableId, userId }: { timetableId: string; userId: string }) {
    const timetable = await this.timetableRepository.getById(timetableId, userId);

    if (!timetable) {
      throw createHttpError.NotFound('Timetable not found');
    }

    const updatedTimetable = await this.timetableRepository.update(timetableId, userId, {
      stage: 'complete',
    });

    return updatedTimetable;
  }

  async update(timetableId: string, userId: string, data: UpdateTimetableData) {
    return this.timetableRepository.update(timetableId, userId, data);
  }

  async delete(timetableId: string, userId: string) {
    return this.timetableRepository.delete(timetableId, userId);
  }
}

export const timetableService = new TimetableService(timetableRepository, timetableDesignerService);
