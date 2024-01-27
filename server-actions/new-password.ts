("use server");

import { getPasswordResetTokenByToken } from "@/dbQueries/password-reset-token";
import { AppResponse } from "../lib/utils/consts/serverResponses";
import { getUserByEmail } from "@/dbQueries/user";
import { NewPasswordSchema } from "@/schemas";
import { db } from "@/lib/utils/consts/db";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return AppResponse.MISSING_TOKEN;
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) return AppResponse.INVALID_FIELDS;

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) return AppResponse.INVALID_TOKEN;

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) return AppResponse.EMAIL_NOT_FOUND;

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) return AppResponse.EMAIL_NOT_EXIST;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return AppResponse.PASSWORD_UPDATED;
};
