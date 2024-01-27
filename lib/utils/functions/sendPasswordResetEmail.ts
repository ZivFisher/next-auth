import { Resend } from "resend";
import { passwordResetEmail } from "../consts/passwordResetEmail";
import { appRoutes } from "../enums";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000${appRoutes.NEW_PASSWORD}?token=${token}`;

  resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your account",
    html: passwordResetEmail(resetLink),
  });
};
