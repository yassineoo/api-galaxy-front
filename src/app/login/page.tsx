import { AuthForm } from "@/components/login/AuthForm";
import { WelcomeSection } from "@/components/login/AuthProviderButton";
import AuthSide from "../../components/login/authSide";

export default function LoginPage() {
  return (
    <div className=" md:flex flex-row-reverse h-screen overflow-hidden ">
      {/* Right side  */}
      <div className="bg-gray-100 slide-in-right dark:bg-gray-950 flex w-1/2 flex-col justify-center items-center gap-8 p-8">
        <WelcomeSection welcome="Get started now" type="login" />
        <AuthForm type="login" />
      </div>
      {/* Left side  */}

      <AuthSide />
    </div>
  );
}
