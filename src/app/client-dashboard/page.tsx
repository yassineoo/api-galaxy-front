"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAuthSession } from "@/components/auth-provider";

export default function ClientDashboardPage() {
  const [selectedApi, setSelectedApi] = useState<number | null>(null);
  const router = useRouter();
  const { session, isAuthenticated } = useAuthSession();

  useEffect(() => {
    const isVerified = localStorage.getItem("isVerified");
    console.log(
      "isVerified",
      isVerified,
      session?.twoFactorEnabled,
      isAuthenticated
    );

    if (isAuthenticated && session && session.twoFactorEnabled && !isVerified) {
      router.push("/verifyOTP");
    }
  }, [session]);

  return (
    <>
      <div>
        <div className="text-center">Select an API to view stats</div>
      </div>
    </>
  );
}
