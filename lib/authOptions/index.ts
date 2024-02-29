import Credentials from "next-auth/providers/credentials";

// Vendor types
import type { AuthOptions } from "next-auth";

// Global types
import type { User as UserType } from "@/types";
import { database } from "@/lib/server";
import { User } from "@/models";

import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "SignIn",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials): Promise<any> {
        // Grab email and password from the submitted form
        const { email, password } = credentials as any;

        // Connect to mongoDb database
        await database();

        // Search for a user by email
        const user: any = await User.findOne({
          email,
        })
          .lean()
          .select("+password");

        // If user isn't found, Reject the promise and return an Error
        if (!user) {
          throw new Error("User not found");
        }

        // Compare password with encryption
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
          throw new Error("Incorrect password");
        }

        if (user) {
          return { ...user };
        }
      },
    }),
  ],

  secret: process.env.SECRET,

  session: {
    strategy: "jwt",
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 60 * 60 * 24 * 30,
  },

  jwt: {
    secret: process.env.SECRET,
  },

  // pages: {},
  callbacks: {
    async session({ session, token: { user } }) {
      // Assign user on the current session
      user && (session.user = user as UserType);

      return session;
    },

    async jwt({ token, user }) {
      // Assign current token to the user object
      user && (token.user = user);
      return token;
    },
  },

  // Enable debug messages in the console if you are having problems
  debug: false,
};