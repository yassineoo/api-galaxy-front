import AdminSidebar from "@/components/admin/adminSidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const router = useRouter();
  return (
    <div className="bg-dashboardBg dark:bg-transparent flex ">
      <AdminSidebar />

      <div className="w-full h-full overflow-scroll">{children}</div>
    </div>
  );
}
