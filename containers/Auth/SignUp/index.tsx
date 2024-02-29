"use client";

// Core types
import type { FC } from "react";

// Core
import { useState } from "react";

// Vendors
import axios from "axios";
import { Formik } from "formik";
import styled from "styled-components";
import { useRouter } from "next/navigation";

// Global components
import { Button, FormField } from "@/components";

// Icon's
import { Eye } from "@styled-icons/fluentui-system-regular/Eye";
import { EyeOff } from "@styled-icons/fluentui-system-regular/EyeOff";

// Validation schema
import { FormValues, validateForm } from "@/schemas/signUp";

const SignUp = styled.div`
  padding: 210px;
`;

const EyeWrap = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0, -50%);
  cursor: pointer;
  z-index: 3;
`;

interface ISignUp {}

const index: FC<ISignUp> = () => {
  // Handle router
  const router = useRouter();

  // Password eye state
  const [isEyeOpened, setIsEyeOpened] = useState(false);

  return (
    <SignUp>
      <Formik<FormValues>
        initialValues={{
          fullName: "",
          email: "",
          password: "",
        }}
        validate={validateForm}
        onSubmit={async data => {
          await axios({
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            url: "/api/register",
            data,
          })
            .then(res => {
              router.push("/login");
            })
            .catch(err => {
              console.log(err.response.data);
            });
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form id="myForm" onSubmit={handleSubmit}>
            <FormField name="fullName" type="text" label="Full Name" />
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
    </SignUp>
  );
};

export { index as SignUp };
