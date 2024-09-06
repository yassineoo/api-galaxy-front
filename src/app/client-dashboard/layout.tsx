"use client";
import { useSession } from "next-auth/react";
import ClientSidebar from "./clientSidebar";
import Header from "@/components/dashboard/header";
import { useAuthSession } from "@/components/auth-provider";
import { redirect } from "next/navigation";

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = useAuthSession();
  if (!session || session.role === "admin") redirect("/login");
  return (
    <div className="bg-dashboardBg dark:bg-transparent flex w-full h-full max-h-full overflow-hidden">
      {/* Sidebar */}
      <ClientSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col w-full h-full">
        {/* Header */}
        <Header name/>

        {/* Children (Main Content) */}
        <div className="w-full h-full overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
