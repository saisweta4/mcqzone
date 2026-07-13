import { NextResponse } from "next/server";
import { getCurrentUser } from "./auth";

export async function requireAdminApi() {
  const user = await getCurrentUser();

  if (!user) {
    return {
      error: NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      ),
    };
  }

  if (user.role !== "ADMIN") {
    return {
      error: NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      ),
    };
  }

  return { user };
}