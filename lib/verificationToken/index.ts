import { database } from "@/lib/server";
import { VerificationToken } from "@/models/VerificationToken";

export const getVerificationTokenByEmail = async (email: string) => {
  await database();

  try {
    const verificationToken = await VerificationToken.findOne({
      email,
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  await database();

  try {
    const verificationToken = await VerificationToken.findOne({
      token: token,
    });

    return verificationToken;
  } catch {
    return null;
  }
};
