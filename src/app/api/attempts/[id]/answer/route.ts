import { NextRequest, NextResponse } from "next/server";
import { saveAnswer } from "@/lib/db/repositories/attempt.repository";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const { questionId, selectedOptionId } = body;

    if (!questionId || !selectedOptionId) {
      return NextResponse.json(
        {
          success: false,
          message: "questionId and selectedOptionId are required",
        },
        { status: 400 }
      );
    }

    const answer = await saveAnswer(
      Number(id),
      questionId,
      selectedOptionId
    );

    return NextResponse.json({
      success: true,
      data: answer,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to save answer",
      },
      { status: 500 }
    );
  }
}