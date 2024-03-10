import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "../verificationToken";

import { database } from "@/lib/server";
import { VerificationToken } from "@/models/VerificationToken";

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
