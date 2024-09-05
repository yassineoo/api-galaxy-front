"use client";


import { authenticate } from "@/actions/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { Errors } from "@/types/common.types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


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

  const { push } = useRouter();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [erreurs, setErreurs] = useState<Errors>({});

  const [data, setData] = useState<any>({
    email: "",
    password: "",
  });
  const onsubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true at the start

    try {
      const res = await authenticate(data, setError, setSuccess);
      console.log("resresres 3 ", res);

      if (res) {
        console.log("resres ", res);
        setSuccess(true);
      }
      setIsLoading(false); // Stop loading after successful authentication
    } catch (e) {
      console.log(e);
      setIsLoading(false); // Stop loading even if an error occurs
    }
  };

  useEffect(() => {
    if (success) push("/admin");
  }, [success]);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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

        <CardContent className="space-y-1">
          <form
            className="flex flex-col gap-2 text-black items-center "
            onSubmit={onsubmit}
          >
            <div className="w-full">
              <Label className="text-sm font-semibold" htmlFor="email">
                Email
                <Input
                  id="email"
                  type="email"
                  className="p-2 my-2 "
                  placeholder="m@example.com"
                  onChange={(e) =>
                    setData({
                      ...data,
                      email: e.target.value,
                    })
                  }
                />
              </Label>
            </div>

            <div className="w-full relative">
              <Label className="text-sm font-semibold" htmlFor="password">
                Password
                <div className="flex items-center">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="p-2 my-2 "
                    onChange={(e) =>
                      setData({
                        ...data,
                        password: e.target.value,
                      })
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-9"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <Image
                        src="/icons/eye.svg"
                        alt="Eye Icon"
                        width={5}
                        height={5}
                      />
                    ) : (
                      <Image
                        src="/icons/eye-off.svg"
                        width={5}
                        height={5}
                        alt="Eye Off Icon"
                      />
                    )}
                  </button>
                </div>
                {erreurs.password && (
                  <p style={{ color: "red" }}>{erreurs.password}</p>
                )}
              </Label>
            </div>

            <span className="self-start text-sm">
              you forgot password ?{" "}
              <a className="text-sm font-bold underline" href="/forgotPass">
                click here
              </a>
            </span>

            <Button
              className="w-full text-center py-2  rounded-md font-semibold"
              type="submit"
            >
              {isLoading ? "Loading..." : "login"}
            </Button>
            {error && <span className="text-red-500">{error}</span>}

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
