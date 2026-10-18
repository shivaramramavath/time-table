export type UserRole = "user" | "admin";

export type UserPreferences = {
  darkMode: boolean;
};

export type User = {
  _id: string;
  userName: string;
  email: string;
  role: UserRole;
  isEmailVerified: boolean;
  preferences: UserPreferences;
  avatar: string | null;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
};
