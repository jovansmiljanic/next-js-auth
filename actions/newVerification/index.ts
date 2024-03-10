"use server";

import { database } from "@/lib/server";
import { getVerificationTokenByToken } from "@/lib/verificationToken";
import { User, VerificationToken } from "@/models";

export const newVerification = async (token: string) => {
  await database();

  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist" };
  }

  const hasExpired = new Date(existingToken.expiresAt) < new Date();

  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const existingUser = await User.findOne({ email: existingToken.email });

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }
  const user = await User.findOneAndUpdate(
    {
      _id: existingUser._id,
    },
    {
      emailVerified: new Date(),
      email: existingToken.email,
    }
  );

  // Store user on the Database
  await user.save();

  await VerificationToken.deleteOne({
    _id: existingToken._id,
  });

  return { success: "Email verified!" };
};
