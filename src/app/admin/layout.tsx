import AdminSidebar from "@/components/admin/adminSidebar";
import { getCurrentUser } from "@/lib/session";
import { Role } from "next-auth";
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

      <div className="w-full h-full overflow-scroll">{children}</div>
    </div>
  );
}
