import { httpClient } from '@/shared/api/httpClient';
import type { User } from './user.types';

export type UpdateUserInput = Partial<User>;

export class UserApi {
  private readonly basePath = '/user';

  async getCurrentUser() {
    const { data: response } = await httpClient.get(`${this.basePath}/me`);

    return response.data;
  }

  async updateCurrentUser(data: UpdateUserInput) {
    const { data: response } = await httpClient.patch(`${this.basePath}/update`, data);

    return response.data;
  }
}

export const userApi = new UserApi();
