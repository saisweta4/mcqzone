import { NextResponse } from "next/server";
import { getExamsByCategory } from "@/lib/db/repositories/exam.repository";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const exams = await getExamsByCategory(Number(id));

    return NextResponse.json({
      success: true,
      data: exams,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch exams",
      },
      { status: 500 }
    );
  }
}