import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    session: ({ session, user, token }) => {
      if (session.user.id == user.id) {
        session.userId = user.id;
      }
      return session;
    },
    jwt: ({ token, user }) => {
      if (token) {
        token.userId = user?.id;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
