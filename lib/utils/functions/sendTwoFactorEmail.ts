import { Resend } from "resend";
import { twoFactorEmail } from "../consts/twoFactorEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorEmail = async (email: string, token: string) => {
  resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA Code",
    html: twoFactorEmail(token),
  });
};
