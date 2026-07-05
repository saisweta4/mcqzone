import { NextResponse } from "next/server";
import { deleteQuestion, getQuestionById,updateQuestion } from "@/lib/db/repositories/question.repository";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const question = await getQuestionById(Number(id));

    if (!question) {
      return NextResponse.json(
        {
          success: false,
          message: "Question not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: question,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch question",
      },
      { status: 500 }
    );
  }
}
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    await updateQuestion(Number(id), body);

    return NextResponse.json({
      success: true,
      message: "Question updated successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update question",
      },
      { status: 500 }
    );
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await deleteQuestion(Number(id));

    return NextResponse.json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete question",
      },
      { status: 500 }
    );
  }
}
