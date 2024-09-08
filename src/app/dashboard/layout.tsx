import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentUser();
  if (!session) redirect("/login");
  return (
    <div className="bg-dashboardBg dark:bg-transparent flex relative h-screen">
      <Sidebar />

      <div className="w-full h-full overflow-y-auto">
        <Header name="Api Provider Dashboard" />
        {children}
      </div>
    </div>
  );
}
