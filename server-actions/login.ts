"use server";

import * as z from "zod";

import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/dbQueries/user";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/utils/functions/token";
import { sendVerificationEmail } from "@/lib/utils/functions/sendVerificationEmail";
import { sendTwoFactorEmail } from "@/lib/utils/functions/sendTwoFactorEmail";
import { getTwoFactorTokenByEmail } from "@/dbQueries/two-factor-token";
import { db } from "@/lib/utils/consts/db";
import { getTwoFactorConfirmationByUserId } from "@/dbQueries/two-factor-confirmation";
import { AppResponse } from "@/lib/utils/consts/serverResponses";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser?.email || !existingUser?.password) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser?.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    if (verificationToken) {
      await sendVerificationEmail(
        verificationToken?.email,
        verificationToken?.token
      );

      return {
        success: "Please confirm your email address before logging in.",
      };
    }
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorCode = await getTwoFactorTokenByEmail(email);

      if (!twoFactorCode) return { error: "Invalid code!" };

      if (twoFactorCode.token !== code) return { error: "Invalid code!" };

      const hasExpired = new Date(twoFactorCode.expires) < new Date();

      if (hasExpired) return { error: "Code expired!" };

      await db.twoFactorToken.delete({
        where: { id: twoFactorCode.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);

      await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
};
