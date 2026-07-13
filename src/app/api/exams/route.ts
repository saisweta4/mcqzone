import { NextResponse } from "next/server";
import { getAllExams,createExam,updateExam,deleteExam } from "@/lib/db/repositories/exam.repository";
import { requireAdminApi } from "@/lib/api";


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

export async function POST(request: Request) {
  const auth = await requireAdminApi();

  if ("error" in auth) {
    return auth.error;
  }
  try {
    const body = await request.json();

    const exam = await createExam(body);

    return NextResponse.json({
      success: true,
      data: exam,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create exam",
      },
      { status: 500 }
    );
  }
}
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const exam = await updateExam(body);

    return NextResponse.json({
      success: true,
      data: exam,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update exam",
      },
      { status: 500 }

    );
  }

}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await deleteExam(id);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete exam",
      },
      { status: 500 }
    );
  }
}