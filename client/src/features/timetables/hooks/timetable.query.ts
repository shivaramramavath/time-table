import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { timetableApi } from '../api/timetable.api';

const useCreateTimetable = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:(data)=> timetableApi.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['timetables'],
      });
    },
  });
};

const useGetTimetables = (query: string) => {
  return useInfiniteQuery({
    queryKey: ['timetables', query],

    queryFn: ({ pageParam }) => timetableApi.getTimetables(pageParam, query),

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 20) {
        return undefined;
      }

      return allPages.length + 1;
    },
  });
};

const useGetRecentTimetables = () => {
  return useQuery({
    queryKey: ['recent-timetables'],
    queryFn: () => timetableApi.getRecentTimetables(),
  });
};

const useDeleteTimetable = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ timetableId }: { timetableId: string }) => timetableApi.delete(timetableId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['timetables'],
      });
    },
  });
};

export const useTimetableMutation = {
  useCreateTimetable,
  useGetTimetables,
  useGetRecentTimetables,
  useDeleteTimetable,
};
