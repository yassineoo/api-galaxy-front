import { Session, User } from "next-auth";

export interface Provider {
    name: string;
    color: string;
    logo: string;
  }


export interface UserProfile {
  email:string 
  id:string 
  name:string 
}

export type Inputs = {
  email: string
  password:string
  errorMessage:string
  username:string
}


export type resetPasswordInputs={
  pass:string
  confirmPass:string 
  errorMessage:string
}

// add error types

export type Errors = {
  password?: string;
  confirmPassword?: string;
  auth?: string;
};