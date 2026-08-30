import crypto from "node:crypto";
import jwt from "jsonwebtoken";

import { env } from "#configs/env.js";
import { ACCESS_TOKEN_EXPIRES_IN } from "#configs/constants.js";

export interface AccessTokenPayload {
  sub: string;
}

const generateAccessToken = (userId: string): string => {
  return jwt.sign(
    {
      sub: userId,
    } satisfies AccessTokenPayload,
    env.JWT_SECRET_KEY,
    {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    },
  );
};

const generateRefreshToken = (sessionId: string): string => {
  const secret = crypto.randomBytes(32).toString("base64url");

  return `${sessionId}.${secret}`;
};

const verifyAccessToken = (token: string): AccessTokenPayload => {
  return jwt.verify(token, env.JWT_SECRET_KEY) as AccessTokenPayload;
};

const getDataFromRefreshToken = (refreshToken: string): string[] => {
  if (!refreshToken) throw new Error("Refresh token not found");
  return refreshToken.split(".")!;
};

const generatePasswordResetToken = (): string => {
  return crypto.randomBytes(32).toString("base64url");
};

export const tokenService = {
  generateAccessToken,
  generateRefreshToken,

  verifyAccessToken,

  getDataFromRefreshToken,

  generatePasswordResetToken,
};
