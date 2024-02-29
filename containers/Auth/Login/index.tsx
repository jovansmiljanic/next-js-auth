"use client";

import { Button, FormField } from "@/components";
import { FormValues, validateForm } from "@/schemas/login";
import axios from "axios";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
// Core types
import { useState, type FC } from "react";
// Icon's
import { Eye } from "@styled-icons/fluentui-system-regular/Eye";
import { EyeOff } from "@styled-icons/fluentui-system-regular/EyeOff";

// Vendors
import styled, { css } from "styled-components";
import { signIn } from "next-auth/react";

const Login = styled.div`
  padding: 210px;
  ${({ theme: { defaults, colors, font, ...theme } }) => css``}
`;

const EyeWrap = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0, -50%);
  cursor: pointer;
  z-index: 3;
`;

interface ILogin {}

const index: FC<ILogin> = () => {
  // Handle router
  const router = useRouter();

  // Password eye state
  const [isEyeOpened, setIsEyeOpened] = useState(false);

  // Handle errors
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  return (
    <Login>
      <Formik<FormValues>
        initialValues={{
          email: "",
          password: "",
        }}
        validate={validateForm}
        onSubmit={async (data, { setSubmitting }) => {
          await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
          }).then(({ error }: any) => {
            if (error === "Verification failed") {
              setErrorMessage("Failed");
            } else {
              if (error) {
                // Alert error
                setErrorMessage(error);

                // Disable submitting
                setTimeout(() => {
                  setSubmitting(false);
                }, 500);
              } else {
                // Set error to false
                setErrorMessage("");

                // Reroute user to the dashboard
                router.push("/");
              }
            }
          });
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form id="myForm" onSubmit={handleSubmit}>
            <FormField name="email" type="email" label="Email" />
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
            />

            <Button
              type="submit"
              $variant="secondary"
              $isLoading={isSubmitting}
              $fullWidth={true}
            >
              {isSubmitting ? "Loading" : "Sign up"}
            </Button>
          </form>
        )}
      </Formik>
    </Login>
  );
};

export { index as Login };
