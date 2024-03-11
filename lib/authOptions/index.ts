// Providers
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// Vendor types
import type { AuthOptions } from "next-auth";

// Global types
import type { User as UserType } from "@/types";

// Server lib
import { database } from "@/lib/database";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";

// User model
import { User } from "@/models";

// Vndor
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

        if (!user.emailVerified) {
          const verificationToken = await generateVerificationToken(user.email);

          await sendVerificationEmail(user.email, verificationToken.token);

          throw new Error("Confirmation email sent!");
        }

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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      // If user is found, return true
      const existingUser = await User.findOne({
        email: user.email,
      });

      if (!existingUser.emailVerified) return false;

      return true;
    },

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

  pages: {
    newUser: "/sign-up",
    signIn: "/login",
  },

  // Enable debug messages in the console if you are having problems
  debug: false,
};
