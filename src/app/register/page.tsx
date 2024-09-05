import { AuthForm } from "@/components/login/AuthForm";
import { WelcomeSection } from "@/components/login/AuthProviderButton";
import AuthSide from "@/components/login/authSide";

export default function LoginPage() {
  return (
    <div className=" md:flex flex-row-reverse  overflow-hidden h-screen ">
      {/* Right side  */}
      <div className="bg-gray-100    overflow-y-scroll  slide-in-right dark:bg-gray-950 flex w-1/2 flex-col justify-center items-center gap-3 p-8">
        <WelcomeSection welcome="Get started now" type="register" />
        <AuthForm type="register" />
      </div>
      {/* Left side  */}

      <AuthSide />
    </div>
  );
}
