import { ZodError, z } from "zod";

// Define the schema outside of the function
export const SignUpSchema = z.object({
  fullName: z.string().min(2, "Name is too short").max(20, "Name is too long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password is too short"),
});

// Infer the type from the schema
export type FormValues = z.infer<typeof SignUpSchema>;

// Define a function that uses the schema to validate form values
export const validateForm = (values: FormValues) => {
  try {
    SignUpSchema.parse(values);
  } catch (error) {
    if (error instanceof ZodError) {
      return error.formErrors.fieldErrors;
    }
  }
};
