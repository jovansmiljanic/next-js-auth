"use client";

// Core types
import { type FC, useTransition, useState } from "react";

// Global components
import { Button, FormField, FormError, FormSuccess } from "@/components";

// Validation schema
import {
  FormValues,
  ResetPasswordSchema,
  validateForm,
} from "@/schemas/reset-password";

// Icon's
import { Eye } from "@styled-icons/fluentui-system-regular/Eye";
import { EyeOff } from "@styled-icons/fluentui-system-regular/EyeOff";

// Vendors
import * as z from "zod";
import { Formik } from "formik";
import styled from "styled-components";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/actions/reset-password";

// Server actions

const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const EyeWrap = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0, -50%);
  cursor: pointer;
  z-index: 3;
`;

export const ResetPassword: FC = () => {
  const router = useRouter();

  // Handle errors and success messages
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [successMessage, setSuccessMessage] = useState<string | undefined>("");

  // Pending state
  const [isPending, startTransition] = useTransition();

  return (
    <LoginWrap>
      <Formik<FormValues>
        initialValues={{
          email: "",
        }}
        validate={validateForm}
        onSubmit={async (data: z.infer<typeof ResetPasswordSchema>) => {
          setErrorMessage(undefined);
          setSuccessMessage(undefined);

          startTransition(() => {
            resetPassword(data).then(({ error, success }) => {
              setErrorMessage(error);
              setSuccessMessage(success);
            });
          });
        }}
      >
        {({ handleSubmit }) => (
          <form id="myForm" onSubmit={handleSubmit}>
            <FormField
              name="email"
              type="email"
              label="Email"
              disabled={isPending}
            />

            <FormError message={errorMessage} />
            <FormSuccess message={successMessage} />

            <Button
              type="submit"
              $variant="secondary"
              $isLoading={isPending}
              $fullWidth={true}
            >
              {isPending ? "Loading" : "Send reset email"}
            </Button>
          </form>
        )}
      </Formik>
    </LoginWrap>
  );
};
