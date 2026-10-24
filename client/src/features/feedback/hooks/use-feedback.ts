import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { feedbackApi } from "../api/feedback.api";
import type { CreateFeedback } from "../types/feedback.types";

export const feedbackKeys = {
  all: ["feedbacks"] as const,
  my: (page = 1, limit = 20) =>
    [...feedbackKeys.all, "my", page, limit] as const,
  detail: (feedbackId: string) =>
    [...feedbackKeys.all, "detail", feedbackId] as const,
};

export const useCreateFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFeedback) => feedbackApi.create(data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: feedbackKeys.all,
      });
    },
  });
};

export const useGetMyFeedback = (page = 1, limit = 20) => {
  return useSuspenseQuery({
    queryKey: feedbackKeys.my(page, limit),
    queryFn: () => feedbackApi.getMyFeedback(page, limit),
  });
};

export const useGetMyFeedbackById = (feedbackId: string) => {
  return useSuspenseQuery({
    queryKey: feedbackKeys.detail(feedbackId),
    queryFn: () => feedbackApi.getMyFeedbackById(feedbackId),
  });
};

export const useDeleteFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (feedbackId: string) =>
      feedbackApi.deleteMyFeedback(feedbackId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: feedbackKeys.all,
      });
    },
  });
};
