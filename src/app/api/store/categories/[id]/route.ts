import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/Category";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authentication check
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized - Please sign in" },
        { status: 401 }
      );
    }

    // Authorization check - only admins can update categories
    const userRole = session.user.role;
    if (!userRole || userRole !== "admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden - Only admins can update categories" },
        { status: 403 }
      );
    }

    await dbConnect();

    const { id } = await params;
    const body = await request.json();
    const { name, slug, description, image, parentId, isActive } = body;

    // Check if slug is unique (excluding current category)
    if (slug) {
      const existingCategory = await Category.findOne({ 
        slug, 
        _id: { $ne: id } 
      });
      if (existingCategory) {
        return NextResponse.json(
          {
            success: false,
            message: "Slug already exists. Please choose a different slug.",
          },
          { status: 400 }
        );
      }
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        ...(name && { name: name.trim() }),
        ...(slug && { slug: slug.trim() }),
        ...(description !== undefined && { description: description.trim() }),
        ...(image !== undefined && { image }),
        ...(parentId !== undefined && { parentId }),
        ...(isActive !== undefined && { isActive }),
      },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error: any) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error updating category",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authentication check
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized - Please sign in" },
        { status: 401 }
      );
    }

    // Authorization check - only admins can delete categories
    const userRole = session.user.role;
    if (!userRole || userRole !== "admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden - Only admins can delete categories" },
        { status: 403 }
      );
    }

    await dbConnect();

    const { id } = await params;

    // Check if category has children
    const hasChildren = await Category.findOne({ parentId: id });
    if (hasChildren) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Cannot delete category with children. Please delete child categories first." 
        },
        { status: 400 }
      );
    }

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error deleting category",
        error: error.message,
      },
      { status: 500 }
    );
  }
}