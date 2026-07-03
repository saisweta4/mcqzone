import { NextResponse } from "next/server";
import { getQuizBySubject } from "@/lib/db/repositories/quiz.repository";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const quiz = await getQuizBySubject(Number(id));

    return NextResponse.json({
      success: true,
      data: quiz,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch quiz",
      },
      { status: 500 }
    );
  }
}