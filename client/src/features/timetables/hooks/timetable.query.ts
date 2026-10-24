import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { timetableApi } from "../api/timetable.api";
import type { CreateTimetable } from "../types/timetable.types";

export const timetableKeys = {
  all: ["timetables"] as const,
};

export const useCreateTimetable = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTimetable) => timetableApi.create(data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: timetableKeys.all,
      });
    },
  });
};

export const useGetTimetables = () => {
  return useSuspenseQuery({
    queryKey: timetableKeys.all,
    queryFn: () => timetableApi.getAllTimetables(),
  });
};
