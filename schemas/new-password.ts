import { ZodError, z } from "zod";

// Define the schema outside of the function
export const NewPasswordSchema = z.object({
  password: z.string().min(8, "Password is too short"),
});

// Infer the type from the schema
export type FormValues = z.infer<typeof NewPasswordSchema>;

// Define a function that uses the schema to validate form values
export const validateNewPasswordForm = (values: FormValues) => {
  try {
    NewPasswordSchema.parse(values);
  } catch (error) {
    if (error instanceof ZodError) {
      return error.formErrors.fieldErrors;
    }
  }
};
