import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Chapter from "@/models/Chapter";
import mongoose from "mongoose";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !["admin", "chapter-admin"].includes(session.user.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid user ID format" }, { status: 400 });
    }

    const user = await User.findById(id).populate("chapter", "chapterName");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Chapter-admins can only view users from their chapter
    if (session.user.role === "chapter-admin") {
      if (user.chapter?._id.toString() !== session.user.chapter) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
      }
    }

    // Remove password from response
    const { password, ...userResponse } = user.toObject();

    return NextResponse.json({
      status: 200,
      message: "User fetched successfully",
      user: userResponse,
    });
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !["admin", "chapter-admin"].includes(session.user.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid user ID format" }, { status: 400 });
    }

    const body = await request.json();
    const { fullName, email, phone, role, chapter, institution, status } = body;

    // Validate required fields
    if (!fullName || !email) {
      return NextResponse.json(
        { message: "Missing required fields: fullName and email are required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Chapter-admins can only update users from their chapter
    if (session.user.role === "chapter-admin") {
      if (existingUser.chapter?.toString() !== session.user.chapter) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
      }
    }

    // Check if email is being changed and if it already exists
    if (email !== existingUser.email) {
      const emailExists = await User.findOne({ email, _id: { $ne: id } });
      if (emailExists) {
        return NextResponse.json(
          { message: "Email already exists" },
          { status: 400 }
        );
      }
    }

    // Validate chapter exists if provided
    if (chapter) {
      const chapterExists = await Chapter.findById(chapter);
      if (!chapterExists) {
        return NextResponse.json(
          { message: "Chapter not found" },
          { status: 400 }
        );
      }
    }

    const updateData = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim(),
      role: role || existingUser.role,
      chapter: chapter || existingUser.chapter,
      institution: institution?.trim(),
      status: status || existingUser.status,
    };

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("chapter", "chapterName");

    // Remove password from response
    const { password, ...userResponse } = updatedUser.toObject();

    return NextResponse.json({
      status: 200,
      message: "User updated successfully",
      user: userResponse,
    });
  } catch (error: any) {
    console.error("Error updating user:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { message: "Validation error", errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized - Admin only" }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid user ID format" }, { status: 400 });
    }

    // Prevent admin from deleting themselves
    if (id === session.user.id) {
      return NextResponse.json(
        { message: "Cannot delete your own account" },
        { status: 400 }
      );
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      status: 200,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}