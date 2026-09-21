import { httpClient } from '@/shared/api/httpClient';

export const timetableApi = {
  create: async () => {
    const { data } = await httpClient.post('/timetable');

    return data.timetable;
  },

  getTimetables: async (pageParam: number, query: string) => {
    const { data } = await httpClient.get(`/timetable?pageParam=${pageParam}&query=${query}`);

    return data.timetables;
  },

  getRecentTimetables: async () => {
    const { data } = await httpClient.get('/timetable/recent');

    return data.timetables;
  },

  delete: async (timetableId: string) => {
    await httpClient.delete(`/timetable?timetableId=${timetableId}`);
  },
};
