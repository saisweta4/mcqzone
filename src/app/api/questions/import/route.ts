import { NextResponse } from "next/server";
import { createQuestion } from "@/lib/db/repositories/question.repository";
import { requireAdminApi } from "@/lib/api";

export async function POST(request: Request) {
  const auth = await requireAdminApi();

  if ("error" in auth) {
    return auth.error;
  }
  try {
    const { subjectId, questions } = await request.json();

    for (const q of questions) {
      await createQuestion({
        question_code: `Q${Date.now()}${Math.floor(Math.random() * 10000)}`,
        subject_id: subjectId,
        question_text: q.questionText,
        explanation: q.explanation,
        difficulty: "Medium",
        marks: 1,
        negative_marks: 0.25,
        options: q.options.map((option: string, index: number) => ({
          text: option,
          is_correct: index === q.correctAnswer,
        })),
      });
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to import questions",
      },
      { status: 500 }
    );
  }
}