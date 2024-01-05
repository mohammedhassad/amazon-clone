import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvide from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvide({
      clientId: String(process.env.GOOGLE_ID),
      clientSecret: String(process.env.GOOGLE_SECRET),
    }),
  ],
};

export default NextAuth(authOptions);
