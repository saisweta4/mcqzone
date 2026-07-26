import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import pool from "@/lib/db/pool";

export async function PUT(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { firstName, lastName } = await req.json();

  const result = await pool.query(
    `
    UPDATE users
    SET
      first_name=$2,
      last_name=$3
    WHERE clerk_id=$1
    RETURNING *;
    `,
    [userId, firstName, lastName]
  );

  return NextResponse.json({
    success: true,
    data: result.rows[0],
  });
}