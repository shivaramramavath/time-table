import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { facultyApi, type CreateFacultyInput, type UpdateFacultyInput } from '../api/FacultyApi';

export const facultyKeys = {
  all: ['faculty'] as const,
  lists: () => [...facultyKeys.all, 'list'] as const,
  list: (query: string) => [...facultyKeys.lists(), query] as const,
  details: () => [...facultyKeys.all, 'detail'] as const,
  detail: (id: string) => [...facultyKeys.details(), id] as const,
};

export const useFaculty = (query = '') => {
  return useQuery({
    queryKey: facultyKeys.list(query),
    queryFn: () => facultyApi.getAll(query),
  });
};

export const useFacultyById = (id: string) => {
  return useQuery({
    queryKey: facultyKeys.detail(id),
    queryFn: () => facultyApi.getById(id),
    enabled: Boolean(id),
  });
};

export const useCreateFaculty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFacultyInput) => facultyApi.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: facultyKeys.all,
      });
    },
  });
};

export const useUpdateFaculty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateFacultyInput }) =>
      facultyApi.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: facultyKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: facultyKeys.detail(variables.id),
      });
    },
  });
};

export const useDeleteFaculty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => facultyApi.delete(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: facultyKeys.all,
      });

      queryClient.removeQueries({
        queryKey: facultyKeys.detail(id),
      });
    },
  });
};
