"use client";
import { useSession } from "next-auth/react";
import ClientSidebar from "./clientSidebar";
import Header from "@/components/dashboard/header";

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  return (
    <div className="bg-dashboardBg dark:bg-transparent flex w-full h-full max-h-full overflow-hidden">
      {/* Sidebar */}
      <ClientSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col w-full h-full">
        {/* Header */}
        <Header name="Customer Dashboard" />

        {/* Children (Main Content) */}
        <div className="w-full h-full overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
