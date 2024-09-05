// components/AuthProviderButton.js
"use client";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";

export function WelcomeSection({ type, welcome = "Welcome back !" }: any) {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">{welcome}</h1>
      <div className="grid gap-2">
        <Button
          onClick={() => signIn("google")}
          variant="outline"
          className="flex items-center justify-center gap-2"
        >
          <ChromeIcon className="h-5 w-5" />
          {type == "register" ? "Sign up with Google" : "Login with Google"}
        </Button>
        {/* <Button
          onClick={() => signIn("github")}
          variant="outline"
          className="flex items-center justify-center gap-2 bg-black text-white"
        >
          <GithubIcon className="h-5 w-5" />

          Login with GitHub
        </Button> */}
      </div>

      {type == "register" ? (
        <p className="mt-2 text-base mb-1">
          Have an account ?{" "}
          <Link href="/login" className="text-blue-500 ml-3 underline">
            login
          </Link>
        </p>
      ) : (
        <p className="mt-2 text-base ">
          {"Don't Have an account ?"}{" "}
          <Link href="/register" className="text-blue-500 ml-3 underline">
            Sign up
          </Link>
        </p>
      )}
    </div>
  );
}

function ChromeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}

function GithubIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
