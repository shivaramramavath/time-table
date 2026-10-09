import { emitAsync } from '@/shared/socket/emit-async';

export const timetableDesignerSocket = {
  get: <T>(timetableId: string) => {
    return emitAsync<T>('timetable-designer:get', {
      timetableId,
    });
  },
};
