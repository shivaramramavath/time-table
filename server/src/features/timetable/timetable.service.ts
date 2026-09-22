import createHttpError from 'http-errors';

import { timetableDesignerService } from '#features/timetable-designer/timetable-designer.service.js';

import { timetableRepository } from './timetable.repository.js';

export const timetableService = {
  create: async ({ userId }: { userId: string }) => {
    const title = 'Untitled Timetable';

    const timetable = await timetableRepository.create({
      title,
      userId,
    });

    await timetableDesignerService.create(timetable._id.toString());

    return timetable;
  },

  getTimetables: async ({
    userId,
    page,
    query,
  }: {
    userId: string;
    page: number;
    query?: string;
  }) => {
    const limit = 20;
    const skip = (page - 1) * limit;

    return timetableRepository.getTimetables({
      userId,
      query,
      skip,
      limit,
    });
  },

  getRecentTimetables: async (userId: string) => {
    return timetableRepository.getRecentTimetables(userId, 5);
  },

  get: async (timetableId: string, userId: string) => {
    return timetableRepository.getById(timetableId, userId);
  },

  generate: async ({ timetableId, userId }: { timetableId: string; userId: string }) => {
    const timetable = await timetableRepository.getById(timetableId, userId);

    if (!timetable) {
      throw createHttpError.NotFound('Timetable not found');
    }

    const updatedTimetable = await timetableRepository.update(timetableId, userId, {
      stage: 'complete',
    });

    return updatedTimetable;
  },

  update: async (
    timetableId: string,
    userId: string,
    data: {
      title?: string;
      description?: string;
      stage?: 'incomplete' | 'editing' | 'complete';
    },
  ) => {
    return timetableRepository.update(timetableId, userId, data);
  },

  delete: async (timetableId: string, userId: string) => {
    return timetableRepository.delete(timetableId, userId);
  },
};
