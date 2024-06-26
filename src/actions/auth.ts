import axios from "axios";
import { getSession, signIn } from "next-auth/react";
import { Inputs, resetPasswordInputs } from "@/types/common.types";
import { UseFormSetError } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";

export const placeholderApi = axios.create({
  baseURL: "http://localhost:5000",
});

export type UserData = {
  email: string;
  password: string;
  Username?: string;
};
class ApiError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = Number(statusCode) || 500;
  }
}

export const authUser = async (data: UserData, isRegister: boolean) => {
  try {
    const res = await placeholderApi.post(
      `${isRegister ? "/register" : "/login"}`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (error: any) {
    throw error;
  }
};

export const oauthUser = async (data: any) => {
  try {
    const res = await placeholderApi.post("/oauth", JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status == 200) {
      return res.data;
    }
  } catch (error) {
    return false;
  }
};

export const getUserSession = async (email: string) => {
  try {
    const res = await placeholderApi.post(
      "/session",
      JSON.stringify({ email }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status == 200) {
      return res.data;
    }
  } catch (error) {
    return null;
  }
};

export const verifyEmail = async (data: any, type: string) => {
  try {
    if (type == "confirmRegistration") {
      const session = await getSession();

      const res = await placeholderApi.post(`/verifyEmail/${data}`, {});
      if (res.status == 200) {
        return true;
      }
      return false;
    } else {
      const res = await placeholderApi.post(
        "/verifyEmail",
        JSON.stringify({ email: data.email }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const resetPassword = async (
  data: resetPasswordInputs,
  setError: UseFormSetError<resetPasswordInputs>
) => {
  try {
    const session = await getSession();
    const res = await placeholderApi.patch(
      "/resetPassword",
      JSON.stringify({ ...data }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
      }
    );
    return res;
  } catch (error: any) {
    setError("errorMessage", {
      message: error?.message,
    });
  }
};

export const authenticate = async (
  data: Inputs,
  setError: UseFormSetError<Inputs>,
  setSuccess: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    if (res?.ok) {
      setSuccess(true);
    } else {
      setError("errorMessage", {
        message: res?.error!,
      });
    }
  } catch (error: any) {
    setError("errorMessage", {
      message: error?.message,
    });
  }
};
