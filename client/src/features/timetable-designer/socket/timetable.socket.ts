import { emitAsync } from "@/shared/socket/emit-async";

export const timetableSocket = {
  update: (timetableId: string, timetable: any) =>
    emitAsync("timetable:update", { timetableId, timetable }),

  get: (timetableId: string) => emitAsync("timetable:get", { timetableId }),

  generate: (timetableId: string) =>
    emitAsync("timetable:generate", { timetableId }),
};
