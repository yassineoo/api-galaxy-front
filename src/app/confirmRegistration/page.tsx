"use client";
import { verifyEmail } from "@/actions/auth";
import LoadingPage from "@/components/shared/loadingPage";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const Page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  useEffect(() => {
    setLoading(true);
    verifyEmail(token, "confirmRegistration")
      .then((res) => {
        if (!res) push("/wrong");
        else push("/login");
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="min-h-screen flex justify-center items-center">
      {loading && <LoadingPage />}
    </div>
  );
};

export default Page;
