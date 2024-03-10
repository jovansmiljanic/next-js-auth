import { ResetPassword } from "@/models/ResetPassword";
import { database } from "../server";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    await database();

    const passwordResetToken = await ResetPassword.findOne({
      token,
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    await database();

    const passwordResetToken = await ResetPassword.findOne({
      email,
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};