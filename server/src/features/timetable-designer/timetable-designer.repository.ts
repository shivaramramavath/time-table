import { errors } from '#utils/errors.js';

import { TimetableDesignerModel } from './timetable-designer.model.js';

export const timetableDesignerRepository = {
  create: async (timetableId: string) => {
    try {
      return await TimetableDesignerModel.create({
        timetableId,
      });
    } catch (err) {
      throw errors.internal(err.message);
    }
  },

  get: async (timetableId: string) => {
    try {
      return await TimetableDesignerModel.findOne({ timetableId }).lean();
    } catch {
      throw errors.internal('Failed to get timetable Designer');
    }
  },
};
