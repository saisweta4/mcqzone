import { NextResponse } from "next/server";
import { getSubjectsByExamSlug } from "@/lib/db/repositories/subject.repository";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const subjects = await getSubjectsByExamSlug(slug);

    return NextResponse.json({
      success: true,
      data: subjects,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch subjects",
      },
      { status: 500 }
    );
  }
}