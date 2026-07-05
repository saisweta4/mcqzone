import { NextRequest,NextResponse } from "next/server";
import { getAllCategories,createCategory,  updateCategory, deleteCategory} from "@/lib/db/repositories/category.repository";

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
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, slug, description } = body;

    if (!name || !slug) {
      return NextResponse.json(
        {
          success: false,
          message: "name and slug are required",
        },
        { status: 400 }
      );
    }

    const category = await createCategory(
      name,
      slug,
      description ?? ""
    );

    return NextResponse.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create category",
      },
      { status: 500 }
    );
  }
}
export async function PUT(request: NextRequest) {
  try {
    const { id, name, slug, description } = await request.json();

    const category = await updateCategory(
      id,
      name,
      slug,
      description ?? ""
    );

    return NextResponse.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update category",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    await deleteCategory(id);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete category",
      },
      { status: 500 }
    );
  }
}