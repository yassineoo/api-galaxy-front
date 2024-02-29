// components/AuthProviderButton.js
"use client"
import { signIn } from "next-auth/react";

export function AuthProviderButton({ provider }: any) {
  return (
    <button onClick={()=>signIn(provider.name)}
      className={`flex w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/2  pl-6 sm:gap-10 md:gap-12 lg:gap-4 xl:gap-8 justify-start items-center py-1 rounded-lg ${provider.color}`}
    >
      <img src={provider.logo} className="rounded-full" width={26} height={26} alt={provider.name} />
      <span className="ml-2 text-sm">Login with {provider.name}</span>
    </button>
  );
}
