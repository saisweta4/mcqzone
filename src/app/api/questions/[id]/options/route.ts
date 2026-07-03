import { NextResponse } from "next/server";
import { getOptionsByQuestion } from "@/lib/db/repositories/option.repository";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const options = await getOptionsByQuestion(Number(id));

    return NextResponse.json({
      success: true,
      data: options,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch options",
      },
      { status: 500 }
    );
  }
}