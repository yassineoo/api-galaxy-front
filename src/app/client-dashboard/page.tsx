"use client";
import Header from "../../components/dashboard/header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { useApiList } from "@/hooks/apis/api.queries";

export default function ClientDashboardPage() {
    const [selectedApi, setSelectedApi] = useState<number | null>(null);
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated" && session?.twoFactorEnabled) {
            router.push("/verifyOTP");
        }
    }, [session, status]);

    return (
        <div className="bg-dashboardBg dark:bg-transparent flex flex-col w-full h-full max-h-full overflow-y-auto">
            <Header />
            <div className="text-center">Select an API to view stats</div>
        </div>
    );
}

