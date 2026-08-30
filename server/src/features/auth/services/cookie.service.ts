import type { Request, Response, CookieOptions } from "express";
import ApiError from "#utils/ApiError.js";
import { env } from "#configs/env.js";
import { REFRESH_TOKEN_EXPIRES_IN } from "#configs/constants.js";

const baseCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: env.NODE_ENV === "production",
  maxAge: REFRESH_TOKEN_EXPIRES_IN,
};

const set = (
  res: Response,
  name: string,
  value: string,
  options: CookieOptions = {},
) => {
  if (!name) throw new ApiError(400, "Cookie name is required");
  if (!res || typeof res.cookie !== "function") {
    throw new ApiError(500, "Invalid response object");
  }

  return res.cookie(name, value, { ...baseCookieOptions, ...options });
};

const remove = (res: Response, name: string, options: CookieOptions = {}) => {
  if (!name) throw new ApiError(400, "Cookie name is required");

  return res.clearCookie(name, { ...baseCookieOptions, ...options });
};

const get = (req: Request, name: string) => {
  if (!req.cookies) {
    throw new ApiError(400, "Cookies middleware not enabled");
  }

  const cookie = req.cookies[name];

  if (!cookie) {
    throw new ApiError(404, `Cookie not found: ${name}`);
  }

  return cookie;
};

export const cookieService = {
  set,
  remove,
  get,
};
