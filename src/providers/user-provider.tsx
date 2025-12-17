'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';

export type UserContextType = {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
};

export const UserContext = React.createContext<UserContextType>({
  setUser: () => undefined,
  user: {} as any,
});

type UserProviderProps = {
  children: React.ReactNode;
  user: any;
};

export const UserProvider = ({ children, user: userToSet }: UserProviderProps) => {
  const [user, setUser] = useState<any>(userToSet);
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
