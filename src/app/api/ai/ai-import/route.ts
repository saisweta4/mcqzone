import { NextResponse } from "next/server";
import { formatQuestionsWithAI } from "@/services/ai/bulkFormatter";
import { requireAdminApi } from "@/lib/api";

export async function POST(req: Request) {
  const auth = await requireAdminApi();

  if ("error" in auth) {
    return auth.error;
  }
  try {
    const { input } = await req.json();

    const questions = await formatQuestionsWithAI(input);

    return NextResponse.json({
      success: true,
      data: questions,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
         message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}