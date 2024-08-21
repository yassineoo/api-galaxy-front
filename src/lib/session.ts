import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { UserData, authUser, getUserSession, oauthUser } from "@/actions/auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId:
        "324751400836-30maqup4crb42q245kj56p3knn576jvd.apps.googleusercontent.com",
      clientSecret: "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",
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
      async authorize(credentials, req): Promise<any> {
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
          return res;
        } catch (error) {
          console.log("error happened");
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
    async jwt({ token, user }) {
      if (user) {
        console.log("user =================================================");
        console.log(user);
        console.log("user =================================================");
        //first call ---> user sign In
        if (user?.name) {
          const res = await oauthUser({
            Email: user?.email,
            Username: user?.name,
          });

          //console.log("response =================================================");
          //console.log(res)
          if (!res.data?.message) {
            token.backendToken = res.data.token;
            token.userId = res.data.userId;

          }
        } else {
          token.backendToken = user.token;
          token.userId = user.userId;
        }
      } else {
        // subsequent calls so the token object has already the needed values
      }
      return token;
    },
    async session({ session, token }): Promise<any> {
      // Add the backend token to the session object
      //console.log(token)
      session.token = token.backendToken as string;
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
