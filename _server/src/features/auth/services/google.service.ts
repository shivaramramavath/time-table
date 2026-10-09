import { OAuth2Client } from 'google-auth-library';

export interface GoogleTokenInfo {
  googleId: string;
  email?: string;
  scopes?: string;
  expiresAt?: number;
  audience?: string;
}

export class GoogleService {
  constructor(private readonly googleClient: OAuth2Client) {}

  async verifyAccessToken(accessToken: string): Promise<GoogleTokenInfo> {
    if (!accessToken) {
      throw new Error('Google access token is required');
    }

    const tokenInfo = await this.googleClient.getTokenInfo(accessToken);

    return {
      googleId: tokenInfo.sub,
      email: tokenInfo.email,
      scopes: tokenInfo.scopes,
      expiresAt: tokenInfo.expiry_date,
      audience: tokenInfo.aud,
    };
  }
}
