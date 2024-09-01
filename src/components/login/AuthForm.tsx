"use client";
import { authenticate } from "@/actions/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { Inputs } from "@/types/common.types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "../modal/modal";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";

export function AuthForm({ type = "login" }: { type: string }) {
  const { push } = useRouter();
  const [success, setSuccess] = useState(false);
  const [showModal, setShwoModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    authenticate(data, setError, setSuccess);
  };

  useEffect(() => {
    if (success && type === "register") setShwoModal(true);
    if (success && type === "login") push("/hub");
  }, [success, type, push]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      {showModal && <Modal closeModal={setShwoModal} type={type} />}
      <Card className="w-full max-w-md">
        <CardContent className="space-y-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 text-black items-center p-5 py-10"
          >
            <div className="w-full">
              <Label className="text-sm font-semibold" htmlFor="email">
                Email
                <Input
                  id="email"
                  type="email"
                  className="p-2 my-2 "
                  placeholder="m@example.com"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
                <span className="text-red-500">{errors.email?.message}</span>
              </Label>
            </div>
            {type == "register" && (
              <div className="w-full relative">
                <Label className="text-sm font-semibold">
                  Username
                  <div className="flex items-center">
                    <Input
                      className="p-2 my-2 "
                      type={"text"}
                      placeholder="username"
                      {...register("username", {
                        required: "Username is required",
                      })}
                    />
                  </div>
                  <span className="text-red-500">
                    {errors.username?.message}
                  </span>
                </Label>
              </div>
            )}

            <div className="w-full relative">
              <Label className="text-sm font-semibold" htmlFor="password">
                Password
                <div className="flex items-center">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="p-2 my-2 "
                    {...register("password", {
                      required: "Password is required",
                    })}
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
                <span className="text-red-500">{errors.password?.message}</span>
              </Label>
            </div>
            {type == "register" && (
              <div className="w-full relative">
                <Label className="text-sm font-semibold">
                  Confirm Password
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="p-2 my-2 "
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {passwordMismatch && (
                    <span className="text-red-500">Passwords do not match</span>
                  )}
                </Label>
              </div>
            )}

            <span className="text-red-500">{errors.errorMessage?.message}</span>
            {type == "login" && (
              <span className="self-start text-sm">
                you forgot password ?{" "}
                <a className="text-sm font-bold underline" href="/forgotPass">
                  click here
                </a>
              </span>
            )}
            <Button
              type="submit"
              className="w-full text-center py-2  rounded-md font-semibold"
              // disabled={isLoading}
            >
              {isLoading ? "Loading..." : type}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
