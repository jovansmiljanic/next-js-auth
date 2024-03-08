"use client";

// Core types
import { type FC, useTransition, useState } from "react";

// Global components
import { Button, FormField, FormError, FormSuccess } from "@/components";

// Validation schema
import { FormValues, LoginSchema, validateForm } from "@/schemas/login";

// Icon's
import { Eye } from "@styled-icons/fluentui-system-regular/Eye";
import { EyeOff } from "@styled-icons/fluentui-system-regular/EyeOff";

// Vendors
import * as z from "zod";
import { Formik } from "formik";
import styled from "styled-components";
import { signIn } from "next-auth/react";

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
      <Formik<FormValues>
        initialValues={{
          email: "",
          password: "",
        }}
        validate={validateForm}
        onSubmit={async (data: z.infer<typeof LoginSchema>) => {
          await signIn("credentials", {
            email: data.email,
            password: data.password,
            // redirect: false,
          }).then(({ error }: any) => {
            if (error) {
              // Alert error
              setErrorMessage(error);
            } else {
              // Set error to false
              setSuccessMessage("Succes");
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
                  {isEyeOpened ? (
                    <EyeOff color="textColorPrimary" width="30px" />
                  ) : (
                    <Eye color="textColorPrimary" width="30px" />
                  )}
                </EyeWrap>
              }
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
              {isPending ? "Loading" : "Login"}
            </Button>
          </form>
        )}
      </Formik>

      <button onClick={() => handleProviderLogin("google")}>Gooogle</button>
    </LoginWrap>
  );
};
