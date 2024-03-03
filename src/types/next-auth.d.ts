import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  
  interface Session {
    user: {
       name: string;
       email: string;
       image: string;
      // Custom fields
       id:number
       verified:boolean
    };
    token:string
  }
  interface User {
    email:string 
    username:string
    id:number
    image:string 
    token:string 
    expiry:string
  }

 
}