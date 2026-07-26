import { NextRequest, NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { updateUserRole } from "@/lib/db/repositories/user.repository";

export async function PUT(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    // Must be logged in
    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Must be an admin
    if (currentUser.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    const { id, role } = await req.json();

    // Prevent changing your own role
    if (currentUser.id === id) {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot change your own role.",
        },
        { status: 400 }
      );
    }

    const user = await updateUserRole(id, role);

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}