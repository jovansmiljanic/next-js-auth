import { ZodError, z } from "zod";

// Define the schema outside of the function
export const ResetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// Infer the type from the schema
export type FormValues = z.infer<typeof ResetPasswordSchema>;

// Define a function that uses the schema to validate form values
export const validateResetPasswordForm = (values: FormValues) => {
  try {
    ResetPasswordSchema.parse(values);
  } catch (error) {
    if (error instanceof ZodError) {
      return error.formErrors.fieldErrors;
    }
  }
};
