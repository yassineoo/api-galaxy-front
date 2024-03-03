import { AuthForm } from "@/components/login/AuthForm";
import { Provider } from "@/types/common.types";
import { AuthProviderButton } from "@/components/login/AuthProviderButton";
import Link from "next/link";
import { getCsrfToken } from "next-auth/react";
const RegisterPage = async () => {
    const csrf=await getCsrfToken()
  const authProviders: Provider[] = [
    {
      name: "google",
      color: "bg-blue-500 text-white",
      logo: "/icons/google.svg",
    },
    {
      name: "github",
      color: "bg-gray-900 text-white",
      logo: "/icons/github.svg",
    }
  ];

  return (
    <div className="flex flex-row-reverse w-full bg-white text-black h-screen py-4">
      <div className="hidden lg:block  lg:w-1/2">
        <img
          className="object-cover w-full min-h-screen"
          src="/images/login_bg_gateway.jpg"
          alt="Background image"
        />
      </div>

      <div className="w-full lg:w-1/2 p-8 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-2">Get started now</h2>

        <div className="space-y-3 w-full flex flex-col items-center">
          {authProviders.map((provider) => (
            <AuthProviderButton key={provider.name} provider={provider} />
          ))}
        </div>

        <p className="mt-4 text-base mb-1">
          Have an account ? <Link href="/login" className="text-blue-500 ml-3 underline">login</Link>
        </p>

        <div className="flex items-center mb-3">
          <div className="border-t border-gray-300 flex-grow mr-3" />
          <p className="text-gray-600 mx-3">Or</p>
          <div className="border-t border-gray-300 flex-grow ml-3" />
        </div>

        <AuthForm type="register" />
      </div>
    </div>
  );
}

export default RegisterPage
