import { NextResponse } from "next/server";
import { createQuestion, getAllQuestions } from "@/lib/db/repositories/question.repository";
import { requireAdminApi } from "@/lib/api";

export async function GET() {
  const auth = await requireAdminApi();

  if ("error" in auth) {
    return auth.error;
  }
  try {
    const questions = await getAllQuestions();

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
export async function POST(request: Request) {
  try {
      const body = await request.json();
  
      const question = await createQuestion(body);
  
      return NextResponse.json({
        success: true,
        data: question,
      });
    } catch (error) {
      console.error(error);
  
      return NextResponse.json(
        {
          success: false,
          message: "Unable to create question",
        },
        { status: 500 }
      );
    }
  }