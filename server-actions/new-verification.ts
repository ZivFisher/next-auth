"use server";

import { getVerificationTokenByToken } from "@/dbQueries/verification-token";
import { getUserByEmail } from "@/dbQueries/user";
import { db } from "@/lib/utils/consts/db";
import { AppResponse } from "@/lib/utils/consts/serverResponses";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) return AppResponse.TOKEN_NOT_EXIST;

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) return AppResponse.EXPIRED_TOKEN;

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) return AppResponse.EMAIL_NOT_EXIST;

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      email: existingToken.email,
      emailVerified: new Date(),
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return AppResponse.EMAIL_VERIFIED;
};
