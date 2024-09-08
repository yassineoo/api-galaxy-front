// "use client";
import { useSession } from "next-auth/react";
import ClientSidebar from "./clientSidebar";
import Header from "@/components/dashboard/header";
import { useAuthSession } from "@/components/auth-provider";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

export default async function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentUser();
  if (!session || session?.role === "admin") redirect("/login?authorize");
  return (
    <div className="bg-dashboardBg dark:bg-transparent flex w-full h-screen max-h-full overflow-hidden">
      {/* Sidebar */}
      <ClientSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col w-full h-screen">
        {/* Header */}
        <Header type="customer" />

        {/* Children (Main Content) */}
        <div className="w-full h-full overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
