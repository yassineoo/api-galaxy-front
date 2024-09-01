"use client";
import { Session } from "next-auth";
import { createContext, ReactNode, useContext } from "react";

const authContext = createContext<CustomSession | null>(null);

export type CustomSession =
  | {
      session: Session;
      isAuthenticated: true;
    }
  | {
      session: null;
      isAuthenticated: false;
    };

export default function AuthProvider({
  session,
  children,
}: {
  session: CustomSession | null;
  children: ReactNode;
}) {
  return (
    <authContext.Provider value={session}>{children}</authContext.Provider>
  );
}

export function useAuthSession() {
  const session = useContext(authContext);
  if (!session) throw new Error("Use it inside AuthProviderWrapper Provider");
  return session;
}
