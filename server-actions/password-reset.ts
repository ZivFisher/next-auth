"use server";

import { getUserByEmail } from "@/dbQueries/user";
import { ResetPasswordSchema } from "@/schemas";
import { sendPasswordResetEmail } from "@/lib/utils/functions/sendEmail";
import { generatePasswordResetToken } from "@/lib/utils/functions/token";
import { z } from "zod";

export const passwordReset = async (
  values: z.infer<typeof ResetPasswordSchema>
) => {
  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields?.success) return { error: "Invalid email" };

  const { email } = validatedFields.data;

  const existingEmail = await getUserByEmail(email);

  if (!existingEmail) return { error: "Email not found" };

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset email sent!" };
};
