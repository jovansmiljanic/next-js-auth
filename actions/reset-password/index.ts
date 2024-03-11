"use server";
import * as z from "zod";
import { ResetPasswordSchema } from "@/schemas";
import { database } from "@/lib/database";
import { User } from "@/models";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>
) => {
  await database();

  const validateFields = ResetPasswordSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }

  const { email } = validateFields.data;

  const existingUser = await User.findOne({
    email,
  });

  if (!existingUser) {
    return { error: "User not found" };
  }

  const passwordResendToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(
    passwordResendToken.email,
    passwordResendToken.token
  );

  return { success: "Reset email sent!" };
};
