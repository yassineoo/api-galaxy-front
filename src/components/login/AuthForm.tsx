"use client"
import { authenticate } from "@/actions/auth"
import {SubmitHandler, useForm} from "react-hook-form"
import { Inputs } from "@/types/common.types"
import { useEffect, useState } from "react"
import {useRouter} from "next/navigation"

export function AuthForm({
  type
}:{
  type:string
}) {
  const {push}=useRouter()
  const [success,setSuccess]=useState(false)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors,isSubmitting},
  } = useForm<Inputs>()
  const onsubmit: SubmitHandler<Inputs> = (data) => {
    authenticate(data,setError,setSuccess)
  }

  useEffect(()=>{
    if(success && type == "register") push("/login")
    if(success && type == "login")  push("/")
  },[success])
  
  return (
    <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-4 text-black items-center border border-slate-200 p-5 py-10 rounded-md shadow-md max-w-md w-full">
      
      <div className="w-full">
        <label className="text-sm text-gray-500 w-full"> Email
        <input
          type="email"
          placeholder="example@example.dz"
          className="border p-2 my-2 outline-none rounded-lg w-full"
          {...register("email",
          {
            required:"Email is required"
          })
        }
        />
        <span className="text-red-500">{errors.email?.message}</span>
        </label>
      </div>
      {type == "register" && <div className="w-full">
        <label className="text-sm text-gray-500"> Username
        <input
          type="text"
          {
            ...register("username")
          }
          placeholder="username"
          className="border p-2 my-2 outline-none rounded-lg w-full"
        />
        </label>
      </div>}
      <div className="w-full">
        <label className="text-sm text-gray-500"> Password
        <input
          type="password"
          placeholder="Password"
          className="border p-2 my-2 rounded-lg outline-none w-full"
        {...register("password",{
          required:"password is required",
          pattern:{
            message:"Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
            value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\^$*.\[\]{}()?\-"!@#%&/,><':;|_~`\\]).{8,}$/
          },
        })}
        />
        <span className="text-red-500">{errors.password?.message}</span>
        
        </label>
      </div>

      <div className="w-full text-start">
        <label className="text-xs text-gray-500">
          <input type="checkbox" className="mr-2" />
          <span className="">Remember me{" "}</span>
        </label>
      </div>
      <span className="text-red-500">{errors.errorMessage?.message}</span>
      
      <button aria-disabled={isSubmitting} type="submit" className="bg-blue-500 w-full mb-4 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
        {isSubmitting ? "submitting" : type}
      </button>
    </form>
  );
}