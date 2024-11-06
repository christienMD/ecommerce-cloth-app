"use server";

import { signOut } from "@/auth";

export async function handleLogOut() {
  await signOut({ redirectTo: "/" });
}
