// Token Generation
import { v4 as uuidv4 } from "uuid";

// Lib's
import { database } from "@/lib/server";
import { getVerificationTokenByEmail } from "@/lib/verificationToken";
import { getPasswordResetTokenByEmail } from "@/lib/passwordResetToken";

// Verification Models
import { VerificationToken, ResetPassword } from "@/models";

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await database();

    await ResetPassword.deleteOne({
      _id: existingToken._id,
    });
  }

  const passwordResetToken = new ResetPassword({
    email,
    token,
    expires,
  });

  // Store user on the Database
  await passwordResetToken.save();

  return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await database();

    await VerificationToken.deleteOne({
      _id: existingToken._id,
    });
  }

  const verificationToken = new VerificationToken({
    email,
    token,
    expires,
  });

  // Store user on the Database
  await verificationToken.save();

  return verificationToken;
};
