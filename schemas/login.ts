import { ZodError, z } from "zod";

// Define the schema outside of the function
export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password is too short"),
});

// Infer the type from the schema
export type FormValues = z.infer<typeof LoginSchema>;

// Define a function that uses the schema to validate form values
export const validateForm = (values: FormValues) => {
  try {
    LoginSchema.parse(values);
  } catch (error) {
    if (error instanceof ZodError) {
      return error.formErrors.fieldErrors;
    }
  }
};
