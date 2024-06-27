"use client";
import { verifyEmail } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Label } from "recharts";

const ForgotPasswordPage = () => {
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isLoading },
  } = useForm<{ email: string }>();
  const onsubmit: SubmitHandler<{ email: string }> = (data) => {
    verifyEmail(data, "forgotPass").then((res) => {
      if (!res) {
        setError("email", {
          message: "unknown email address",
        });
      }
      if (res) push("/confirmMail");
    });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-950">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email address below and we'll send you instructions to
            reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                {...register("email", {
                  required: "email is required",
                })}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 my-2 outline-none rounded-lg w-full border border-slate-500"
              />
              <span className="text-red-500">{errors.email?.message}</span>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Loading..." : "Reset Password"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm">
          <Link href="/login" className="underline" prefetch={false}>
            Back to login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
