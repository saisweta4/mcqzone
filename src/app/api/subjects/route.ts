import { NextResponse } from "next/server";
import {createSubject,
  updateSubject,
  deleteSubject, } from "@/lib/db/repositories/subject.repository";

  export async function POST(request: Request) {
  try {
    const body = await request.json();

    const subject = await createSubject(body);

    return NextResponse.json({
      success: true,
      data: subject,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create subject",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const subject = await updateSubject(body);

    return NextResponse.json({
      success: true,
      data: subject,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update subject",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    await deleteSubject(id);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete subject",
      },
      { status: 500 }
    );
  }
}
