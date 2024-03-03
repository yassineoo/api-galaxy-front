import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

import jwt from "jsonwebtoken";

const SignToken = async (id: number) => {
  const token = await jwt.sign({ userId: id }, process.env.NEXTAUTH_SECRET!, {
    expiresIn: "1d",
  });
  return token;
};

export default SignToken;
