import { httpClient } from "@/shared/lib/http/http-client";
import { Axios } from "axios";
import { ForgotPasswordFormValues } from "../schemas/forgot-password.schema";
import { ResetPasswordFormValues } from "../schemas/reset-password.schema";
import { SigninFormValues } from "../schemas/signin.schema";
import type { SignupFormValues } from "../schemas/signup.schema";

class AuthApi {
  private path = "/auth";

  constructor(private readonly httpClient: Axios) {}

  async signup(data: SignupFormValues): Promise<unknown> {
    const { data: response } = await this.httpClient.post(
      `${this.path}/signup`,
      data,
    );

    return response;
  }

  async signin(data: SigninFormValues): Promise<unknown> {
    const { data: response } = await this.httpClient.post(
      `${this.path}/signin`,
      data,
    );

    return response;
  }

  async signout(): Promise<unknown> {
    const { data: response } = await this.httpClient.post(
      `${this.path}/signout`,
    );

    return response;
  }

  async forgotPassword(data: ForgotPasswordFormValues): Promise<unknown> {
    const { data: response } = await this.httpClient.post(
      `${this.path}/forgot-password`,
      data,
    );

    return response;
  }

  async resetPassword(
    data: ResetPasswordFormValues,
    token: string,
  ): Promise<unknown> {
    const { data: response } = await this.httpClient.post(
      `${this.path}/reset-password`,
      data,
      {
        params: {
          token,
        },
      },
    );

    return response;
  }
}

export const authApi = new AuthApi(httpClient);
