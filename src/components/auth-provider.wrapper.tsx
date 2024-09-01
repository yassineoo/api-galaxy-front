import { getCurrentUser } from "@/lib/session";
import { ReactNode } from "react";
import AuthProvider from "./auth-provider";
import { CustomSession } from "./auth-provider";
export default async function AuthProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getCurrentUser();
  let customSession: CustomSession = { session: null, isAuthenticated: false };
  if (session) customSession = { session, isAuthenticated: true };

  return <AuthProvider session={customSession}>{children}</AuthProvider>;
}
