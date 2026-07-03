import { NextResponse } from "next/server";
import pool from "@/lib/db/pool";

export async function GET() {
  console.log("HOST:", process.env.DB_HOST);
  console.log("PORT:", process.env.DB_PORT);
  console.log("DATABASE:", process.env.DB_NAME);
  console.log("USER:", process.env.DB_USER);
  console.log("PASSWORD:", process.env.DB_PASSWORD);

  try {
    const result = await pool.query("SELECT NOW()");

    return NextResponse.json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json({
      success: false,
      error: String(err),
    });
  }
}