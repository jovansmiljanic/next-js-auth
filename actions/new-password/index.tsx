"use server";
import * as z from "zod";

import { NewPasswordSchema } from "@/schemas/new-password";
import { getPasswordResetTokenByToken } from "@/lib/passwordResetToken";
import { User } from "@/models";
import bcrypt from "bcryptjs";
import { ResetPasswordSchema } from "@/schemas/reset-password";
import { ResetPassword } from "@/models/ResetPassword";

export const newPassword = async (
  data: z.infer<typeof NewPasswordSchema>,
  token: string | null
) => {
  if (!token) {
    return {
      error: "Missing token",
    };
  }

  const validateFields = NewPasswordSchema.safeParse(data);

  if (!validateFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { password } = validateFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return {
      error: "Invalid token",
    };
  }

  const hasExpired = new Date(existingToken.expiresAt) < new Date();

  if (hasExpired) {
    return {
      error: "Token has expired",
    };
  }

  const existingUser = await User.findOne({
    email: existingToken.email,
  });

  if (!existingUser) {
    return {
      error: "Email not found",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.findOneAndUpdate(
    {
      _id: existingUser._id,
    },
    {
      password: hashedPassword,
    }
  );

  await user.save();

  await ResetPassword.deleteOne({
    _id: existingToken._id,
  });

  return {
    success: "Password has been reset!",
  };
};
