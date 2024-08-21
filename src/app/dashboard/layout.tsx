import { Inter } from "next/font/google";
import Sidebar from "@/components/dashboard/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const router = useRouter();
  return (
    <div className="bg-dashboardBg dark:bg-transparent flex ">
      <Sidebar />

      <div className="w-full h-full overflow-y-auto">{children}</div>
    </div>
  );
}
