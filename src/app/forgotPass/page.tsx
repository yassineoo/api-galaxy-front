"use client";
import { verifyEmail } from "@/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
const page = () => {
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
    <>
      <div className="container w-full mx-auto bg-white min-h-screen">
        {/* verify my password */}
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="absolute top-[6rem] right-[50%] translate-x-[50%] shadow-xl rounded-3xl flex flex-col items-center max-w-sm w-full p-4"
        >
          {/* your logo */}
          <div className="border-2 border-black border-dashed h-20 w-20 rounded-full" />
          <h3 className="font-Lora font-bold mt-4 mb-8 text-black">
            Forgot your password ?
          </h3>
          <p className="text-center text-black">
            Enter your e-mail and follow the instructions to reset your
            password.
          </p>
          <input
            type="email"
            value={email}
            {...register("email", {
              required: "email is required",
            })}
            onChange={(e) => setEmail(e.target.value)}
            className={`my-4 w-5/6 px-4 py-2 rounded-md outline-none border border-slate-500`}
            placeholder="email"
          />
          <span className="text-red-500">{errors.email?.message}</span>

          <button
            type="submit"
            className="my-4 py-3 bg-goldColor w-5/6 text-black mb-5 font-semibold rounded-md"
          >
            Continuer
          </button>

          {/* retour */}
          <Link href={"/login"} className="underline text-seconadryColor mb-5">
            retour
          </Link>
        </form>
      </div>
    </>
  );
};

export default page;
