"use client";
import { AuthForm } from "@/components/login/AuthForm";
import { WelcomeSection } from "@/components/login/AuthProviderButton";
import AuthSide from "../../components/login/authSide";
import AuthorizationModal from "@/components/auth/authorization.modal";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const unauthorized = searchParams.has("unauthorized");
  const [showModal, setShowModal] = useState(unauthorized);
  const router = useRouter();
  function closeModal() {
    setShowModal(false);
    router.replace("/login");
  }
  return (
    <div className="flex flex-row-reverse h-screen overflow-hidden ">
      {/* Right side  */}
      <div className="flex-1 bg-gray-100 slide-in-right dark:bg-gray-950 flex w-1/2 flex-col justify-center items-center gap-8 p-8">
        <WelcomeSection welcome="Get started now" type="login" />
        <AuthForm type="login" />
      </div>
      {/* Left side  */}
      <AuthSide />
      {showModal && <AuthorizationModal closeModal={closeModal} />}
    </div>
  );
}
