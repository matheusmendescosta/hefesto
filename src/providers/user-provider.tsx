"use client";

import { UserDTO } from "@/dto/user";
import React, { Dispatch, SetStateAction, useState } from "react";

export type UserContextType = {
  user: UserDTO;
  setUser: Dispatch<SetStateAction<UserDTO>>;
};

export const UserContext = React.createContext<UserContextType>({
  setUser: () => undefined,
  user: {} as UserDTO,
});

type UserProviderProps = {
  children: React.ReactNode;
  user: UserDTO;
};

export const UserProvider = ({
  children,
  user: userToSet,
}: UserProviderProps) => {
  const [user, setUser] = useState<UserDTO>(userToSet);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
