import { Resend } from "resend";
import { passwordResetEmail } from "../consts/passwordResetEmail";
import { appRoutes } from "../enums";
import { twoFactorEmail } from "../consts/twoFactorEmail";
import { verificationEmail } from "../consts/verificationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}${appRoutes.NEW_PASSWORD}?token=${token}`;

  resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your account",
    html: passwordResetEmail(resetLink),
  });
};

export const sendTwoFactorEmail = async (email: string, token: string) => {
  resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA Code",
    html: twoFactorEmail(token),
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}${appRoutes.NEW_VERIFICATION}?token=${token}`;

  resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your account",
    html: verificationEmail(confirmLink),
  });
};
