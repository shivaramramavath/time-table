let accessToken: string | null = null;

export const Token = {
  setToken(token: string): void {
    accessToken = token;
  },

  getToken(): string | null {
    return accessToken;
  },

  clearToken(): void {
    accessToken = null;
  },
};
