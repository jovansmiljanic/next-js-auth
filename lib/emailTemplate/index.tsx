import * as React from "react";
import { Html, Container, Button, Heading } from "@react-email/components";

export const PasswordResetEmailTemplate = (props: any) => {
  const { url } = props;

  return (
    <Html lang="en">
      <Container>
        <Heading as="h4" style={{ fontWeight: "normal" }}>
          Hi,
        </Heading>
        <Heading as="h4" style={{ fontWeight: "normal" }}>
          Someone recently requested a password change for your account. If this
          was you, you can set a new password here:
        </Heading>

        <Button
          href={url}
          style={{
            backgroundColor: "#4BA3D9",
            color: "#FFFFFF",
            paddingBottom: "15px",
            paddingTop: "15px",
            paddingLeft: "35px",
            paddingRight: "35px",
            borderRadius: "5px",
            textDecoration: "none",
          }}
        >
          Reset password!
        </Button>

        <Heading as="h4" style={{ fontWeight: "normal" }}>
          If you don&apos;t want to change your password or didn&apos;t request
          this, just ignore and delete this message.
        </Heading>

        <Heading as="h4" style={{ fontWeight: "normal" }}>
          Happy App name!
        </Heading>
      </Container>
    </Html>
  );
};

export const VerificationEmailTemplate = (props: any) => {
  const { url } = props;

  return (
    <Html lang="en">
      <Container>
        <Heading as="h2" style={{ fontWeight: "bold" }}>
          Verify your email address
        </Heading>
        <Heading as="h4" style={{ fontWeight: "normal" }}>
          Thanks for starting the new account creation process. We want to make
          sure it&apos;s really you. Please click on verification button.
        </Heading>

        <Button
          href={url}
          style={{
            backgroundColor: "#4BA3D9",
            color: "#FFFFFF",
            paddingBottom: "15px",
            paddingTop: "15px",
            paddingLeft: "35px",
            paddingRight: "35px",
            borderRadius: "5px",
            textDecoration: "none",
          }}
        >
          Verify email!
        </Button>

        <Heading as="h4" style={{ fontWeight: "normal" }}>
          If you don&apos;t want to create an account, you can ignore this
          message.
        </Heading>

        <Heading as="h4" style={{ fontWeight: "normal" }}>
          Happy App name!
        </Heading>
      </Container>
    </Html>
  );
};
