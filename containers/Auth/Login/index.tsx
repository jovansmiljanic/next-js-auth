"use client";

// Core types
import { type FC, useTransition, useState } from "react";

// Global components
import { Button, FormField, FormError, FormSuccess } from "@/components";

// Validation schema
import { LoginSchema, validateLoginForm } from "@/schemas";

import { EyeIcon, EyeOffIcon } from "@/public/svg";
// Icon's
// Vendors
import * as z from "zod";
import { Formik } from "formik";
import styled from "styled-components";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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

export const Login: FC = () => {
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
    <LoginWrap>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={validateLoginForm}
        onSubmit={async (data: z.infer<typeof LoginSchema>) => {
          setErrorMessage("");
          setSuccessMessage("");

          const validatedFields = LoginSchema.safeParse(data);

          if (!validatedFields.success) {
            setErrorMessage("Invalid fields");
          }

          await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
          }).then(res => {
            if (res?.error) {
              switch (res.error) {
                case "CredentialsSignin":
                  setErrorMessage("Invalid credentials");
                default:
                  setErrorMessage(res.error);
              }
            } else {
              // Set error to false
              setSuccessMessage("Succes");

              setTimeout(function () {
                router.push("/");
              }, 1000);
            }
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
            <FormField
              name="password"
              type={isEyeOpened ? "text" : "password"}
              label="Password"
              customCode={
                <EyeWrap onClick={() => setIsEyeOpened(!isEyeOpened)}>
                  {isEyeOpened ? <EyeOffIcon /> : <EyeIcon />}
                </EyeWrap>
              }
              disabled={isPending}
            />

            <a href="/reset-password">Forgot password?</a>

            <FormError message={errorMessage} />
            <FormSuccess message={successMessage} />

            <Button
              type="submit"
              $variant="secondary"
              $isLoading={isPending}
              $fullWidth={true}
            >
              {isPending ? "Loading" : "Login"}
            </Button>
          </form>
        )}
      </Formik>

      <button onClick={() => handleProviderLogin("google")}>Gooogle</button>
    </LoginWrap>
  );
};
