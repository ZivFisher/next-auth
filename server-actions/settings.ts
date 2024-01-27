"use server";

import { getUserByEmail, getUserById } from "@/dbQueries/user";
import { currentUser } from "@/lib/utils/consts/auth";
import { db } from "@/lib/utils/consts/db";
import { sendVerificationEmail } from "@/lib/utils/functions/sendEmail";
import { generateVerificationToken } from "@/lib/utils/functions/token";
import { SettingsSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) return { error: "Unauthorized" };

  const dbUser = await getUserById(user.id);

  if (!dbUser) return { error: "Unauthorized" };

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values?.email) {
    if (values?.email !== user?.email) {
      const existingEmail = await getUserByEmail(values.email);
      if (existingEmail) return { error: "Email already in use!" };

      const verificationToken = await generateVerificationToken(values.email);

      if (verificationToken)
        await sendVerificationEmail(
          verificationToken.email,
          verificationToken.token
        );

      return { success: "Verification email sent!" };
    }
  }

  if (values?.password && values?.newPassword && dbUser?.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordsMatch) return { error: "Incorrect password!" };

    if (values.password === values.newPassword)
      return { error: "New password must be different!" };

    const salt = await bcrypt.genSalt();
    const newHashedPassword = await bcrypt.hash(values.newPassword, salt);

    values.password = newHashedPassword;
    if (values?.newPassword) values.newPassword = undefined;
  }

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { success: "Settings Updated!" };
};
