import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: any = {
  providers: [
    GoogleProvider({
      clientId:
        "644062440978-s1jpsc29j5bm9st5aho5oi9dpg6k6lu8.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  jwt: {
    signingKey: "superman",
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async session({ session, token }: any) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    redirect: async (url: any, _baseUrl: any) => {
      if (url === "/user") {
        return Promise.resolve("/");
      }
      return Promise.resolve("/");
    },
  },
};
