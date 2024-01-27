"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  //Doing server stuff before the user logout...

  await signOut();
};
