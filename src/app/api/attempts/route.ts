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

   const attempt = {
  id: 999,
  exam_id: examId,
  status: "IN_PROGRESS",
};

    return NextResponse.json({
      success: true,
      data: attempt,
    });
  } catch (error) {
  console.error("Create Attempt Error:", error);

  return NextResponse.json(
    {
      success: false,
      message: String(error),
    },
    { status: 500 }
  );
}
}