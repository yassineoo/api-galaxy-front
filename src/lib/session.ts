import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { UserData, authUser, oauthUser } from "@/actions/auth";
import { SERVER_ENV } from "./env";
import { Role } from "@/utils/constants";
import jwt from "jsonwebtoken";
// Function to generate JWT
const generateApiKey = (userId: number, secret: string) => {
  return jwt.sign({ userId }, secret, { expiresIn: "30d" });
};

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

          // console.log("responsessssss", res);
          return res?.data;
        } catch (error: any) {
          //   console.log("error login", error);

          const errorMessage =
            error.response?.data?.message || "Authentication failed";
          // console.log("Authorization Error:", errorMessage);

          // Throw a new error with the message
          throw new Error(errorMessage);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 10, //10hr
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
      // console.log({ token, user, session, props });
      if (user) {
        console.log({ user });
        if (user?.name) {
          //console.log("awchahooo")
          const res = await oauthUser({
            Email: user?.email,
            Username: user?.name,
            image: user?.image,
          });
          // console.log("responsessss", res.data);

          if (!res.data?.message) {
            token.token = res.data.token.token;
            token.backendToken = res.data.token.token;
            token.userId = res.data.userId;
            token.twoFactorEnabled = res.data.twoFactorEnabled;
            token.is2faAuthenticated = !res.data.twoFactorEnabled;
            token.role = res.data.role;
          }
        } else {
          // console.log("hi from elseeesssssssssssse", user);

          token.token = user.token;
          token.backendToken = user.token;
          token.userId = user.userId;
          token.name = user.name ?? user.username;
          token.twoFactorEnabled = user.twoFactorEnabled;
          token.is2faAuthenticated = !user.twoFactorEnabled;
          token.role = user?.role;
          console.log("token", token);
          console.log("token r", user?.role);
        }
        // Add two-factor authentication status to the toke
        token.isVerified = false;
      } else {
        // console.log("hi from elseeee");
        // subsequent calls so the token object has already the needed values
        //  console.log({ token, user, session });
      }
      return token;
    },
    async session({ session, token, ...props }): Promise<any> {
      // l
      // console.log({ session, token, ...props });
      // Add the backend token to the session object
      // console.log("token", token);
      session.token = token.backendToken as string;

      session.userId = token.userId as number;
      session.twoFactorEnabled = token.twoFactorEnabled as boolean;
      session.role = token.role as Role;
      session.apiKey = await generateApiKey(
        token.userId as number,
        "process.env.NEXTAUTH_SECRET!"
      );
      console.log("session-------", token.userId);

      // console.log("session---", session);

      return session;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/dashboard`;
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
