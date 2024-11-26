// auth.ts

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "@/prisma/client";
import type { NextAuthConfig } from "next-auth";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id?: string;
    } & DefaultSession["user"];
  }
}

const config = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user}) {
      try {
        if (!user.email) return true;

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          // Split name into first and last name
          const nameParts = user.name?.split(" ") || ["Unknown"];
          const firstName = nameParts[0];
          const lastName = nameParts.slice(1).join(" ") || "User";

          // Create new user
          await prisma.user.create({
            data: {
              email: user.email,
              username:
                user.name?.toLowerCase().replace(/\s+/g, "_") ||
                user.email.split("@")[0],
              firstName,
              lastName,
              passwordHash: "oauth",
              image: user.image || null,
              emailVerified: new Date(),
            },
          });
          console.log("Created new user in database:", user.email);
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return true; // Still allow sign in even if db creation fails
      }
    },
  },
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);


// import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";

// const authConfig = {
//   providers: [
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
// };

// export const {
//   auth,
//   signIn,
//   signOut,
//   handlers: { GET, POST },
// } = NextAuth(authConfig);
