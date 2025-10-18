import { createContext } from "react";

export const UserContext = createContext<UserContext | undefined>(undefined);

export type UserContext = {
  userId: string | undefined;
  username: string | undefined;
};
