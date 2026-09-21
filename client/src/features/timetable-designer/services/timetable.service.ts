import { timetableSocket } from '../socket/timetable.socket';

export const timetableService = {
  update: (timetableId: string, data) => {
    timetableSocket.update(timetableId, data);
  },

  get: (timetableId: string) => timetableSocket.get(timetableId),
};
