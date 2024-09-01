"use client"
import Sidebar from "@/components/dashboard/sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {data:session,status} = useSession()
 
  return (
    <div className="bg-dashboardBg dark:bg-transparent flex ">
      <Sidebar />

      <div className="w-full h-full overflow-y-auto">{children}</div>
    </div>
  );
}
