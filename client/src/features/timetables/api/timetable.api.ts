import { httpClient } from '@/shared/api/httpClient';

interface CreateTimetableData {
  title: string;
  description?: string;
}

export const timetableApi = {
  create: async (formData: CreateTimetableData) => {
    const { data } = await httpClient.post('/timetable', formData);

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
