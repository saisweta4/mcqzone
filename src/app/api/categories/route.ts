import { NextResponse } from "next/server";
import { getAllCategories } from "@/lib/db/repositories/category.repository";

export async function GET() {
  try {
    const categories = await getAllCategories();

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch categories",
      },
      { status: 500 }
    );
  }
}