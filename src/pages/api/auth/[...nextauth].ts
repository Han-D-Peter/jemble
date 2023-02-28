/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-param-reassign */
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import nextAuth, { NextAuthOptions } from "next-auth";
import NaverProvider from "next-auth/providers/naver";
import client from "src/libs/client";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(client),
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_ID as string,
      clientSecret: process.env.NAVER_SECRET as string,
      profile(profile) {
        return {
          ...profile.response,
          points: 1000,
        };
      },
    }),
    // ...add more providers here
  ],
  secret: process.env.SECRET,
  callbacks: {
    session: async ({ session, user }) => {
      session.user.id = user.id;
      return Promise.resolve(session);
    },
  },
};
export default nextAuth(authOptions);
