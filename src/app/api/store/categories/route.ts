import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/Category";

export async function GET(request: NextRequest) {
  try {
    // Authentication check
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized - Please sign in" },
        { status: 401 }
      );
    }

    // Authorization check - only admins and chapter-admins can access categories
    const userRole = session.user.role;
    if (!userRole || !["admin", "chapter-admin"].includes(userRole)) {
      return NextResponse.json(
        { success: false, message: "Forbidden - Insufficient permissions" },
        { status: 403 }
      );
    }

    await dbConnect();

    const categories = await Category.find().sort({ name: 1 });

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error: any) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching categories",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authentication check
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized - Please sign in" },
        { status: 401 }
      );
    }

    // Authorization check - only admins can create categories
    const userRole = session.user.role;
    if (!userRole || userRole !== "admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden - Only admins can create categories" },
        { status: 403 }
      );
    }

    await dbConnect();

    const body = await request.json();
    const { name, slug, description, image, parentId, isActive } = body;

    // Validate required fields
    if (!name || !slug) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: name and slug are required",
        },
        { status: 400 }
      );
    }

    // Check if slug is unique
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return NextResponse.json(
        {
          success: false,
          message: "Slug already exists. Please choose a different slug.",
        },
        { status: 400 }
      );
    }

    // Create new category
    const newCategory = new Category({
      name: name.trim(),
      slug: slug.trim(),
      description: description?.trim() || "",
      image: image || "",
      parentId: parentId || null,
      isActive: isActive !== undefined ? isActive : true,
    });

    const savedCategory = await newCategory.save();

    return NextResponse.json(
      {
        success: true,
        message: "Category created successfully",
        data: savedCategory,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating category:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Error creating category",
        error: error.message,
      },
      { status: 500 }
    );
  }
}