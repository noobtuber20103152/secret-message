// clientId = "644062440978-s1jpsc29j5bm9st5aho5oi9dpg6k6lu8.apps.googleusercontent.com"
//clientSecret = "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"
// authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',

import { authOptions } from "@/providers/next-auth-options";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// authOptions
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
