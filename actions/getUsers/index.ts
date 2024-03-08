"use server";

// User model
import { User } from "@/models";

// Database connection
import { database } from "@/lib/server";

// User type
import type { User as IUser } from "@/types";

export const getUsers = async () => {
  await database();

  // Grab current user
  const users: IUser[] = await User.find();

  return JSON.parse(JSON.stringify(users));
};
