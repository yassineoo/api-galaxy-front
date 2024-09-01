import axios from "axios";
import { getSession, signIn } from "next-auth/react";
import { Inputs, resetPasswordInputs } from "@/types/common.types";
import { UseFormSetError } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { ApiAuth } from "@/utils/constants";

export const placeholderApi = axios.create({

  baseURL:  ApiAuth,

});

export type UserData = {
  email: string;
  password: string;
  username?: string;
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
    console.log({ data })
    const res = await placeholderApi.post(
      isRegister ? "/register" : "/login",
      {
        email: data.email,
        password: data.password,
        username: data.username,
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    console.log({ res })

    return res.data;
  } catch (error: any) {
    console.log({ error })

    throw error;
  }
};

export const oauthUser = async (data: { Email: string, Username: string }) => {
  try {
    //console.log("called in oauth")
    const res = await placeholderApi.post("/oauth",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      });
    return res;
  } catch (error) {
    console.log({ OAUTH_ERROR: error })
    return {
      data: {}
    }
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
    // console.log(error);
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
    }
    else {
      console.log({ res })
      setError("errorMessage", {
        message: res?.error!,
      });
    }
  } catch (error: any) {
    console.log({ error })
    setError("errorMessage", {
      message: error?.message,
    });
  }
};
