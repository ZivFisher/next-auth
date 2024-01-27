"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/utils/consts/db";
import { getUserByEmail } from "@/dbQueries/user";
import { generateVerificationToken } from "@/lib/utils/functions/token";
import { sendVerificationEmail } from "@/lib/utils/functions/sendVerificationEmail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email, name, password } = validatedFields.data;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: "Email already in use!" };

  await db.user.create({
    data: { email, name, password: hashedPassword },
  });

  const verificationToken = await generateVerificationToken(email);

  if (verificationToken) {
    await sendVerificationEmail(
      verificationToken?.email,
      verificationToken?.token
    );

    return { success: "Confirmation email sent!" };
  }
};
