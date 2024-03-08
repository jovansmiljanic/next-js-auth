"use server";

// User model
import { User } from "@/models";

// Database connection
import { database } from "@/lib/server";

// Vendors
import * as z from "zod";
import bcrypt from "bcryptjs";

// Validation schema
import { SignUpSchema } from "@/schemas/signUp";

export const register = async (values: z.infer<typeof SignUpSchema>) => {
  const validatedFields = SignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { fullName, email, password } = validatedFields.data;

  const encryptedPassword = await bcrypt.hash(password, 8);

  await database();

  const isEmailTaken = Boolean(await User.findOne({ email }));

  if (isEmailTaken) {
    return {
      error: "Email is already used",
    };
  }

  // Create user model object
  const user = new User({
    name: fullName,
    email,
    password: encryptedPassword,
  });

  // Store user on the Database
  await user.save();

  return {
    success: "User created successfully!",
  };
};