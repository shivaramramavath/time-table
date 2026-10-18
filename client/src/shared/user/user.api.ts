import { httpClient } from "@/shared/lib/http/http-client";
import type { User } from "./user.types";

export type UpdateUserInput = Partial<User>;

export class UserApi {
  private readonly basePath = "/users";

  async getCurrentUser() {
    const { data: response } = await httpClient.get(`${this.basePath}/profile`);

    return response.data;
  }

  async updateCurrentUser(data: UpdateUserInput) {
    const { data: response } = await httpClient.patch(
      `${this.basePath}/profile`,
      data,
    );

    return response.data;
  }
}

export const userApi = new UserApi();
