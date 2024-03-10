// Vendors
import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false, select: false },
    image: { type: String, required: false },
    emailVerified: { type: Date, default: null },
  },
  { collection: "Users", timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", Schema);
