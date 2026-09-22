import createHttpError from 'http-errors';

import { TimetableDesignerModel } from './timetable-designer.model.js';

export const timetableDesignerRepository = {
  create: async (timetableId: string) => {
    try {
      return await TimetableDesignerModel.create({
        timetableId,
      });
    } catch (err) {
      throw createHttpError.InternalServerError(err.message);
    }
  },

  get: async (timetableId: string) => {
    try {
      return await TimetableDesignerModel.findOne({ timetableId }).lean();
    } catch {
      throw createHttpError.InternalServerError('Failed to get timetable Designer');
    }
  },
};
