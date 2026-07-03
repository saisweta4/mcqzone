import { NextResponse } from "next/server";
import { getAllExams } from "@/lib/db/repositories/exam.repository";

export async function GET() {
  try {
    const exams = await getAllExams();

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