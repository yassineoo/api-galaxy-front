"use client";
import { useSession } from "next-auth/react";
import ClientSidebar from "./clientSidebar";

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  return (
    <div className="bg-dashboardBg dark:bg-transparent flex">
      <ClientSidebar />
      <div className="w-full h-full overflow-y-auto">{children}</div>
    </div>
  );
}
