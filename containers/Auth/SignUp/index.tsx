"use client";

// Core
import { type FC, useState, useTransition } from "react";

// Vendors
import * as z from "zod";
import { Formik } from "formik";
import styled from "styled-components";

// Global components
import { Button, FormError, FormField, FormSuccess } from "@/components";

// Icon's
import { EyeIcon, EyeOffIcon } from "@/public/svg";

// Validation schema
import { SignUpSchema, validateSignUpForm } from "@/schemas/";

// Server actions
import { register } from "@/actions/register";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignUpWrap = styled.div`
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

export const SignUp: FC = () => {
  // Handle router
  const router = useRouter();

  // Password eye state
  const [isEyeOpened, setIsEyeOpened] = useState(false);

  // Handle errors and success messages
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [successMessage, setSuccessMessage] = useState<string | undefined>("");

  // Pending state
  const [isPending, startTransition] = useTransition();

  const handleProviderLogin = (provider: "google") => {
    startTransition(() => {
      signIn(provider, { callbackUrl: "/" });
    });
  };

  return (
    <SignUpWrap>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
        }}
        validate={validateSignUpForm}
        onSubmit={async (data: z.infer<typeof SignUpSchema>) => {
          setErrorMessage(undefined);
          setSuccessMessage(undefined);

          startTransition(() => {
            register(data).then(({ error, success }) => {
              setErrorMessage(error);
              setSuccessMessage(success);
            });
          });
        }}
      >
        {({ handleSubmit }) => (
          <form id="myForm" onSubmit={handleSubmit}>
            <FormField name="fullName" type="text" label="Full Name" />
            <FormField name="email" type="email" label="Email" />
            <FormField
              name="password"
              type={isEyeOpened ? "text" : "password"}
              label="Password"
              customCode={
                <EyeWrap onClick={() => setIsEyeOpened(!isEyeOpened)}>
                  {isEyeOpened ? <EyeOffIcon /> : <EyeIcon />}
                </EyeWrap>
              }
            />

            <FormError message={errorMessage} />
            <FormSuccess message={successMessage} />

            <Button
              type="submit"
              $variant="secondary"
              $isLoading={isPending}
              $fullWidth={true}
            >
              {isPending ? "Loading" : "Create an account"}
            </Button>
          </form>
        )}
      </Formik>

      <button onClick={() => handleProviderLogin("google")}>Gooogle</button>
    </SignUpWrap>
  );
};
