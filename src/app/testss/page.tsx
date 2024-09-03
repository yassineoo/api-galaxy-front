"use client";

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
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { authUser } from "@/actions/auth";
import { useRouter } from "next/navigation";

const Logo = () => {
  return (
    <div
      className={`flex items-center w-32 gap-4 justify-between mt-4 px-4 ${"transform"}`}
    >
      <img className="w-16" src="/logos/logo.svg" />
      <h2 className="flex justify-center items-center font-bold text-white text-lg">
        Api <br /> Galaxy
      </h2>
    </div>
  );
};

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await authUser({ email, password }, false);
      console.log("Login successful:", response);
      if (response.data.role !== "admin") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userData", JSON.stringify(response.data));
        router.push("/admin");
      } else {
        setError("You are not an admin");
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100vh] w-full flex flex-col justify-start gap-8 items-center bg-transparent">
      <img
        src="/images/loginAdmin.jpg"
        className="absolute w-full h-full -z-10 bg-cover object-cover"
      />
      <Logo />

      <Card className="px-12">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Enter your email below to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <CardFooter>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : "Login"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
