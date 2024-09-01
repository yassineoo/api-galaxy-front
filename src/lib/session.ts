import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { UserData, authUser, oauthUser } from "@/actions/auth";
import { SERVER_ENV } from "./env";
import { AxiosError } from "axios";
import { setAuthToken } from "./get-auth-token";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: SERVER_ENV.GOOGLE_CLIENT_ID,
      clientSecret: SERVER_ENV.GOOGLE_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: {
          type: "email",
          label: "email",
        },
        password: {
          type: "password",
          label: "password",
        },
        username: {
          type: "text",
          label: "username",
        },
      },
      async authorize(credentials): Promise<any> {
        const isRegister = Boolean(credentials?.username);
        const data = {
          email: credentials?.email,
          password: credentials?.password,
        } as UserData;
        if (isRegister) {
          data.username = credentials?.username;
        }
        try {
          const res = await authUser(data, isRegister);
          await setAuthToken(res.token)
          res.backendToken = res.token
          console.log({ res })
          return {
            email: data.email,
            username: data.username,
            backendToken: res.token,
            image: "",
            ...res,
            token: res.token,
          };
        } catch (error) {
          console.log({ error })
          if (error instanceof AxiosError) {
            if ("errors" in error?.response?.data) {
              console.log(error?.response?.data?.errors)
              throw new Error(error?.response?.data?.errors)
            }
            if ("message" in error?.response?.data) {
              console.log(error?.response?.data)
              throw error?.response?.data
            }
            throw error.response?.data
          }
          throw new Error("Wrong Credentials")
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET!,
  },
  theme: {
    colorScheme: "light",
    logo: "/logo.svg",
  },

  callbacks: {
    async jwt({ token, user, session, ...props }) {
      console.log({ token, user, session, props })
      if (user) {
        if (user?.name) {
          const res = await oauthUser({
            Email: user?.email,
            Username: user?.name,
          });

          //console.log("response =================================================");
          //console.log(res)
          if (!res || !res.data?.message) {
            token.backendToken = res.data.token;
            token.userId = res.data.userId;

          }
        } else {
          token.token = user.token;
          token.backendToken = user.token;
          token.userId = user.userId;
        }
      } else {
        // subsequent calls so the token object has already the needed values
      }
      return token;
    },
    async session({ session, token, ...props }): Promise<any> {
      console.log({ session, token, ...props })
      // Add the backend token to the session object
      //console.log(token)
      session.token = token.token as string
      session.token = (token.backendToken as { token: string }).token;
      session.userId = token.userId as number;
      return session;
    },
    async redirect(params) {
      return params.baseUrl;
    },
  },
  pages: {
    signIn: "/login",
  },
};

//create utility function
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session;
}
