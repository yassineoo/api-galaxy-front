import Header from "@/components/dashboard/header";
import { ReactNode } from "react";

export default async function InboxLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="bg-dashboardBg dark:bg-transparent flex flex-col h-full relative overflow-y-hidden">
      <div className="h-full max-h-full relative ">{children}</div>
    </div>
  );
}
