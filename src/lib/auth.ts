import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "./db/repositories/user.repository";

export async function getCurrentUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const user = await getUserByClerkId(userId);

  return user;
}