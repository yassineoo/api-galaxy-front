"use client";
import { authenticate } from "@/actions/auth";
import { validatePassword } from "@/utils/auth";
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
import { Errors } from "@/types/common.types";

export function AuthForm({ type = "login" }: { type: string }) {
  const { push } = useRouter();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShwoModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [erreurs, setErreurs] = useState<Errors>({});

  const [data, setData] = useState<any>({
    email: "",
    password: "",
  });
  const onsubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true at the start

    const validationErrors =
      type === "register"
        ? validatePassword(data.password, confirmPassword)
        : {};
    if (Object.keys(validationErrors).length > 0) {
      setErreurs(validationErrors);
      setIsLoading(false); // Stop loading if validation fails
      return;
    }

    try {
      await authenticate(data, setError, setSuccess);
      setIsLoading(false); // Stop loading after successful authentication
    } catch (e) {
      console.log(e);
      setIsLoading(false); // Stop loading even if an error occurs
    }
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
        <CardContent className="space-y-2">
          <form
            className="flex flex-col gap-4 text-black items-center px-5 pt-3 "
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
            {type == "register" && (
              <div className="w-full relative">
                <Label className="text-sm font-semibold">
                  Username
                  <div className="flex items-center">
                    <Input
                      className="p-2 my-2 "
                      type={"text"}
                      placeholder="username"
                      onChange={(e) =>
                        setData({
                          ...data,
                          username: e.target.value,
                        })
                      }
                    />
                  </div>
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
                  {erreurs.confirmPassword && (
                    <p style={{ color: "red" }}>{erreurs.confirmPassword}</p>
                  )}
                </Label>
              </div>
            )}
            {type == "login" && (
              <span className="self-start text-sm">
                you forgot password ?{" "}
                <a className="text-sm font-bold underline" href="/forgotPass">
                  click here
                </a>
              </span>
            )}
            <Button
              className="w-full text-center py-2  rounded-md font-semibold"
              type="submit"
            >
              {isLoading ? "Loading..." : type}
            </Button>
            {error && <span className="text-red-500">{error}</span>}
          </form>
        </CardContent>
      </Card>
    </>
  );
}
