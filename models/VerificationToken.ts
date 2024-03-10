// Vendors
import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    email: { type: String },
    token: { type: String, unique: true },
    expires: { type: Date },
  },
  { collection: "VerificationTokens", timestamps: true }
);

export const VerificationToken =
  mongoose.models.VerificationToken ||
  mongoose.model("VerificationToken", Schema);
