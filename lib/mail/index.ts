// Vendors
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
import {
  PasswordResetEmailTemplate,
  VerificationEmailTemplate,
} from "../emailTemplate";

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXTAUTH_URL}/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    // react: <EmailTemplate url={confirmLink} />,
    react: VerificationEmailTemplate({ url: confirmLink }),
  });
};
// html: `<p>Click here to confirm your email: <a href=${confirmLink}>Here</a></p>`,

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXTAUTH_URL}/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password!",
    react: PasswordResetEmailTemplate({ url: resetLink }),

    // html: `<p>Click here to reset your password: <a href=${resetLink}>Reset</a></p>`,
  });
};
