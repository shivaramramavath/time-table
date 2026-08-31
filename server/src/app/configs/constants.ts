const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export const ACCESS_TOKEN_EXPIRES_IN = 15 * MINUTE;

export const REFRESH_TOKEN_EXPIRES_IN = 7 * DAY;

export const SESSION_TTL = 7 * DAY;

export const BREVO_URL = "https://api.brevo.com/v3";

export const DESIGNER_TTL = HOUR;
export const PAGE_SIZE = 20;

export const GROQ_LARGE_MODEL = "openai/gpt-oss-120b";
export const GROQ_SMALL_MODEL = "openai/gpt-oss-20b";
