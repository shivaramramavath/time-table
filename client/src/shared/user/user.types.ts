export type User = {
  _id: string;
  email: string;
  userName: string;
  avatar: string;
  preferences: {
    darkMode: boolean;
  };
};
