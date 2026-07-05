import { NextResponse } from "next/server";
import { generateExplanation } from "@/services/ai/explanation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { question, options, correctAnswer } = body;

    if (
      !question ||
      !options ||
      !Array.isArray(options) ||
      !correctAnswer
    ) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const explanation = await generateExplanation({
      question,
      options,
      correctAnswer,
    });

    return NextResponse.json({ explanation });
  } catch (error) {
    console.error("Explanation API Error:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}