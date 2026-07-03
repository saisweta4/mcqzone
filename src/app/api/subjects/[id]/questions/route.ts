import { NextResponse } from "next/server";
import { getQuestionsBySubject } from "@/lib/db/repositories/question.repository";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const questions = await getQuestionsBySubject(Number(id));

    return NextResponse.json({
      success: true,
      data: questions,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch questions",
      },
      { status: 500 }
    );
  }
}