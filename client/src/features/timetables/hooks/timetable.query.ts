import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { timetableApi } from "../api/timetable.api";

const timetableKey = "timetables";

export const useCreateTimetable = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => timetableApi.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [timetableKey],
      });
    },
  });
};

export const useGetTimetables = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: timetableKey,
    queryFn:()=>timetableApi.getAllTimetables()
  });
};
