import { NextRequest, NextResponse } from "next/server";
import { createAttempt } from "@/lib/db/repositories/attempt.repository";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { examId } = body;

    if (!examId) {
      return NextResponse.json(
        {
          success: false,
          message: "examId is required",
        },
        { status: 400 }
      );
    }

    const attempt = await createAttempt(examId);

    return NextResponse.json({
      success: true,
      data: attempt,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create attempt",
      },
      { status: 500 }
    );
  }
}