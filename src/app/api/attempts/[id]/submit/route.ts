import { NextResponse } from "next/server";
import { submitAttempt } from "@/lib/db/repositories/attempt.repository";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await submitAttempt(Number(id));

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit quiz",
      },
      { status: 500 }
    );
  }
}