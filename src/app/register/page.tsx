import { WelcomeSection } from "@/components/login/AuthProviderButton";
import { AuthForm } from "@/components/login/AuthForm";
import Image from "next/image";

export default function Register() {
  return (
    <div className="grid md:grid-cols-2 min-h-screen w-full">
      <div className="bg-gray-100 dark:bg-gray-950 flex flex-col justify-center items-center gap-8 p-8">
        <WelcomeSection welcome="Get started now" type="register" />
        <AuthForm type="register" />
      </div>
      <div className="hidden md:block bg-gray-100 dark:bg-gray-950 relative">
        <Image
          src="/images/login_bg_gateway.jpg"
          alt="Login image"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
}
