import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { roomApi, type CreateRoomInput, type UpdateRoomInput } from '../api/RoomApi';

export const roomKeys = {
  all: ['room'] as const,

  lists: () => [...roomKeys.all, 'list'] as const,

  list: (query: string) => [...roomKeys.lists(), query] as const,

  details: () => [...roomKeys.all, 'detail'] as const,

  detail: (id: string) => [...roomKeys.details(), id] as const,
};

export const useRoom = (query = '') => {
  return useQuery({
    queryKey: roomKeys.list(query),
    queryFn: () => roomApi.getAll(query),
  });
};

export const useRoomById = (id: string) => {
  return useQuery({
    queryKey: roomKeys.detail(id),
    queryFn: () => roomApi.getById(id),
    enabled: Boolean(id),
  });
};

export const useCreateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRoomInput) => roomApi.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: roomKeys.all,
      });
    },
  });
};

export const useUpdateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRoomInput }) => roomApi.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: roomKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: roomKeys.detail(variables.id),
      });
    },
  });
};

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => roomApi.delete(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: roomKeys.all,
      });

      queryClient.removeQueries({
        queryKey: roomKeys.detail(id),
      });
    },
  });
};
