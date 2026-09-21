import { httpClient } from '@/shared/api/httpClient';

export const userApi = {
  getCurrentUser: () => httpClient.get('/user/me'),
};
