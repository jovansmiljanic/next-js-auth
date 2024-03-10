// Vendors
import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    email: { type: String },
    token: { type: String, unique: true },
    expires: { type: Date },
  },
  { collection: "ResetPasswords", timestamps: true }
);

export const ResetPassword =
  mongoose.models.ResetPassword || mongoose.model("ResetPassword", Schema);
