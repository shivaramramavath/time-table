import { httpClient } from '@/shared/api/httpClient';

export const templateApi = {
  // Get all templates owned by current user
  getAll: async () => {
    const { data } = await httpClient.get('/templates');

    return data;
  },

  // Get private templates owned by current user
  getPrivate: async () => {
    const { data } = await httpClient.get('/templates/private');

    return data;
  },

  // Get public templates
  getPublic: async () => {
    const { data } = await httpClient.get('/templates/public');

    return data;
  },

  // Get a single template
  get: async (id: string) => {
    const { data } = await httpClient.get(`/templates/${id}`);

    return data;
  },
};
