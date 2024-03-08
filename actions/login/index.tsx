"use server";

// Validation schema
import { LoginSchema } from "@/schemas/login";

// Vendors
import * as z from "zod";
import { signIn } from "next-auth/react";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { email, password } = validatedFields.data;

  await signIn("credentials", {
    email,
    password,
    redirect: false,
  }).then(({ error }: any) => {
    if (error) {
      return {
        error,
      };
    }
  });

  return { success: "Email sent!" };
};
