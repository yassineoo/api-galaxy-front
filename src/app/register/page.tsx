import { Input } from "@/components/ui/input";
import { Provider } from "@/types/common.types";
import { signIn } from "next-auth/react";
import { WelcomeSection } from "@/components/login/AuthProviderButton";
import { AuthForm } from "@/components/login/AuthForm";

export default function LoginPage() {
  return (
    <div className="grid md:grid-cols-2 min-h-screen w-full">
      <div className="bg-gray-100 dark:bg-gray-950 flex flex-col justify-center items-center gap-8 p-8">
        <WelcomeSection welcome="Get started now" type="register" />
        <AuthForm type="register" />
      </div>
      <div className="hidden md:block bg-gray-100 dark:bg-gray-950">
        <img
          src="/images/login_bg_gateway.jpg"
          alt="Login image"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
