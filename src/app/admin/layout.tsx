import AdminSidebar from "@/components/admin/adminSidebar";
import Header from "@/components/dashboard/header";
import { getCurrentUser } from "@/lib/session";
import { Role } from "@/utils/constants";
import { redirect } from "next/navigation";

// SERVER COMPONENT
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentUser();
  if (session?.role !== Role.ADMIN) return redirect("/loginAdmin");
  return (
    <div className="bg-dashboardBg dark:bg-transparent flex ">
      <AdminSidebar />

      <div className="w-full h-full overflow-scroll">
        <Header type="admin" />
        {children}
      </div>
    </div>
  );
}
