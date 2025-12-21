"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { UserProvider } from "./user-provider";
import { UserDTO } from "@/dto/user";

interface AuthProviderProps {
  children: ReactNode;
  user: UserDTO;
}

export function AuthProvider({ children, user }: AuthProviderProps) {
  return (
    <SessionProvider>
      <UserProvider user={user}>{children}</UserProvider>
    </SessionProvider>
  );
}
