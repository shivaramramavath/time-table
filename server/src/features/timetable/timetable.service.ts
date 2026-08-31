import { timetableDesignerService } from "#features/timetable-designer/timetable-designer.service.js";
import { timetableRepository } from "./timetable.reposistory.js";

export const timetableService = {
  create: async ({ userId }: { userId: string }) => {
    const title = "Untitled Timetable";
    const timetable = await timetableRepository.create({ title, userId });
    await timetableDesignerService.create(timetable._id);

    return timetable;
  },

  getTimetables: async ({ userId, pageParam, query }: any) => {
    const limit = 20;
    const skip = (pageParam - 1) * limit;
    return await timetableRepository.getTimetables({
      userId,
      query,
      skip,
      limit,
    });
  },

  getRecentTimetables: async (userId: string) => {
    return await timetableRepository.getRecentTimetables(userId, 5);
  },

  get: (timetableId: string) => timetableRepository.get(timetableId),

  update: async (timetableId: string, data: any) => {
    return await timetableRepository.update(timetableId, data);
  },

  delete: async (timetableId: string) => {
    return await timetableRepository.delete(timetableId);
  },
};
