import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { subjectApi, type CreateSubjectInput, type UpdateSubjectInput } from '../api/SubjectApi';

export const subjectKeys = {
  all: ['subject'] as const,
  lists: () => [...subjectKeys.all, 'list'] as const,
  list: (query: string) => [...subjectKeys.lists(), query] as const,
  details: () => [...subjectKeys.all, 'detail'] as const,
  detail: (id: string) => [...subjectKeys.details(), id] as const,
};

export const useSubject = (query = '') => {
  return useQuery({
    queryKey: subjectKeys.list(query),
    queryFn: () => subjectApi.getAll(query),
  });
};

export const useSubjectById = (id: string) => {
  return useQuery({
    queryKey: subjectKeys.detail(id),
    queryFn: () => subjectApi.getById(id),
    enabled: Boolean(id),
  });
};

export const useCreateSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSubjectInput) => subjectApi.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: subjectKeys.all,
      });
    },
  });
};

export const useUpdateSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSubjectInput }) =>
      subjectApi.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: subjectKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: subjectKeys.detail(variables.id),
      });
    },
  });
};

export const useDeleteSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => subjectApi.delete(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: subjectKeys.all,
      });

      queryClient.removeQueries({
        queryKey: subjectKeys.detail(id),
      });
    },
  });
};
