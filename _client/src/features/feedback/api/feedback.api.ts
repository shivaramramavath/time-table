import { httpClient } from '@/shared/api/httpClient';

export interface CreateFeedbackPayload {
  text: string;
  rating: number;
}

const create = async (payload: CreateFeedbackPayload) => {
  const { data } = await httpClient.post('/feedback/create', payload);

  return data;
};

export const feedbackApi = {
  create,
};
