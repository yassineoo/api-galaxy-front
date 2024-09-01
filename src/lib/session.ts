import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { UserData, authUser, oauthUser } from "@/actions/auth";

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
          console.log("response",res)
          return res.data;
        } catch (error:any) {
          const errorMessage = error.response?.data?.message || "Authentication failed";
          console.log("Authorization Error:", errorMessage);

    // Throw a new error with the message
    throw new Error(errorMessage);
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
        if (user?.name) {
          //console.log("awchahooo")
          const res = await oauthUser({
            Email: user?.email,
            Username: user?.name,
          });
          if (!res.data?.message) {
            token.backendToken = res.data.token;
            token.userId = res.data.userId;
            token.twoFactorEnabled = res.data.twoFactorEnabled;
            token.is2faAuthenticated = !res.data.twoFactorEnabled;
          }
        } else {
          token.backendToken = user.token;
          token.userId = user.userId;
          token.name=user.name ?? user.username
          token.twoFactorEnabled = user.twoFactorEnabled;
          token.is2faAuthenticated = !user.twoFactorEnabled;
        }
        // Add two-factor authentication status to the toke
      token.isVerified = false
      } else {
        console.log("hi from else")
        // subsequent calls so the token object has already the needed values
      }
      return token;
    },
    async session({ session, token }): Promise<any> {
      // Add the backend token to the session object
      console.log('token',token)
      session.token = token.backendToken as string;
      session.userId = token.userId as number;
      session.twoFactorEnabled = token.twoFactorEnabled as boolean;
      session.isVerified = token.isVerified as boolean;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/dashboard`;
    }
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
