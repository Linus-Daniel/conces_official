// /api/settings/route.ts
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// GET - Fetch user settings
export async function GET(request: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const user = await User.findById(session.user.id)
      .select("-password -verificationToken")
      .populate("chapter", "chapterName chapterLocation");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        institution: user.institution,
        role: user.role,
        avatar: user.avatar,
        chapter: user.chapter,
        location: user.location,
        verified: user.verified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Settings fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user settings" },
      { status: 500 }
    );
  }
}

// PUT - Update user settings
export async function PUT(request: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { fullName, phone, institution, location, avatar } = data;

    // Validate required fields
    if (!fullName) {
      return NextResponse.json(
        { error: "Full name is required" },
        { status: 400 }
      );
    }

    const updateData: any = {
      fullName: fullName.trim(),
      updatedAt: new Date(),
    };

    // Add optional fields if provided
    if (phone !== undefined) updateData.phone = phone.trim();
    if (institution !== undefined) updateData.institution = institution.trim();
    if (location !== undefined) updateData.location = location.trim();
    if (avatar !== undefined) updateData.avatar = avatar;

    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      updateData,
      { new: true, runValidators: true }
    ).select("-password -verificationToken");

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Settings updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}

