import { Resend } from "resend";
import { verificationEmail } from "../consts/verificationEmail";
import { appRoutes } from "../enums";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000${appRoutes.NEW_VERIFICATION}?token=${token}`;

  resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your account",
    html: verificationEmail(confirmLink),
  });
};
