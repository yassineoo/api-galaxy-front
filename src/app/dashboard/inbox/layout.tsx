import Header from "@/components/dashboard/header";
import { ReactNode } from "react";

export default async function InboxLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="bg-dashboardBg dark:bg-transparent flex flex-col h-screen overflow-y-hidden">
      <Header />
      <div className="h-full max-h-full relative ">{children}</div>
    </div>
  );
}
