import NextAuth from "next-auth";
import { JWT, Session, User } from "next-auth";
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface Session {
    name: string;
    email: string;
    image: string;
    // Custom fields
    userId: number;
    verified: boolean;
    token: string;
    twoFactorEnabled: boolean;
    role: string;
    // isVerified: boolean;
    is2faAuthenticated: boolean;
    //isVerified: false;
  }
  interface User {
    email: string;
    username: string;
    userId: number;
    image: string;
    token: string;
    expiry: string;
    twoFactorEnabled: boolean;
    role: string;
  }
}
