// app/api/executives/[id]/route.js - GET, PUT, DELETE for /api/executives/[id]
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Executive from "@/models/Executive";
import mongoose from "mongoose";

// GET /api/executives/[id] - Get single executive by ID
export async function GET(request:NextRequest, { params }:{ params: Promise<{ id: string }> }) {
  try {
    await dbConnect();

    const { id } = await params;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid executive ID format",
        },
        { status: 400 }
      );
    }

    const executive = await Executive.findById(id);

    if (!executive) {
      return NextResponse.json(
        {
          success: false,
          message: "Executive not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: executive,
    });
  } catch (error:any) {
    console.error("Error fetching executive:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching executive",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// PUT /api/executives/[id] - Update executive
export async function PUT(request:NextRequest, { params }:{params:Promise<{id:string}>}) {
  try {
    await dbConnect();

    const { id } = await params;
    const body = await request.json();

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid executive ID format",
        },
        { status: 400 }
      );
    }

    const updateData = { ...body };

    // Remove fields that shouldn't be updated directly
    delete updateData._id;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    // If updating position, check for conflicts (only for Active status)
    if (
      updateData.position &&
      (!updateData.status || updateData.status === "Active")
    ) {
      const existingExecutive = await Executive.findOne({
        position: updateData.position,
        session: updateData.session || "2024/2025 Spiritual Session",
        status: "Active",
        _id: { $ne: id }, // Exclude current executive
      });

      if (existingExecutive) {
        return NextResponse.json(
          {
            success: false,
            message: `Position "${updateData.position}" is already assigned to ${existingExecutive.name}`,
          },
          { status: 400 }
        );
      }
    }

    const updatedExecutive = await Executive.findByIdAndUpdate(id, updateData, {
      new: true, // Return updated document
      runValidators: true, // Run schema validation
    });

    if (!updatedExecutive) {
      return NextResponse.json(
        {
          success: false,
          message: "Executive not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Executive updated successfully",
      data: updatedExecutive,
    });
  } catch (error:any) {
    console.error("Error updating executive:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err:any) => err.message);
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
        message: "Error updating executive",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// DELETE /api/executives/[id] - Delete executive
export async function DELETE(request:NextRequest, { params }:{ params: Promise<{ id: string }> }) {
  try {
    await dbConnect();

    const { id } = await params;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid executive ID format",
        },
        { status: 400 }
      );
    }

    const deletedExecutive = await Executive.findByIdAndDelete(id);

    if (!deletedExecutive) {
      return NextResponse.json(
        {
          success: false,
          message: "Executive not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Executive deleted successfully",
      data: deletedExecutive,
    });
  } catch (error:any) {
    console.error("Error deleting executive:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error deleting executive",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
