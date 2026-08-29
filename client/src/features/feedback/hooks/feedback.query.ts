import { useMutation } from "@tanstack/react-query";

import { feedbackApi } from "../api/feedback.api";

const useCreateFeedback = () => {
  return useMutation({
    mutationFn: feedbackApi.create,
  });
};

export const useFeedbackQuery = {
  useCreateFeedback,
};
