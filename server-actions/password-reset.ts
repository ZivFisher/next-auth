"use server";

import { getUserByEmail } from "@/dbQueries/user";
import { ResetPasswordSchema } from "@/schemas";
import { sendPasswordResetEmail } from "@/lib/utils/functions/sendEmail";
import { generatePasswordResetToken } from "@/lib/utils/functions/token";
import { AppResponse } from "@/lib/utils/consts/serverResponses";
import { z } from "zod";

export const passwordReset = async (
  values: z.infer<typeof ResetPasswordSchema>
) => {
  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields?.success) return AppResponse.INVALID_EMAIL;

  const { email } = validatedFields.data;

  const existingEmail = await getUserByEmail(email);

  if (!existingEmail) return AppResponse.EMAIL_NOT_FOUND;

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return AppResponse.RESET_EMAIL_SENT;
};
