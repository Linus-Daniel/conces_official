import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import dbConnect from "@/lib/dbConnect";
import AlumniProfile from "@/models/Alumni";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user already has an alumni profile
    const existingProfile = await AlumniProfile.findOne({ userId: session.user.id });
    if (existingProfile) {
      return NextResponse.json(
        { error: "Alumni profile already exists" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      graduationYear,
      education,
      workExperience,
      specialization,
      currentRole,
      bio,
      avatar,
      skills,
      socialLinks
    } = body;

    // Validate required fields
    const missingFields = [];
    if (!graduationYear) missingFields.push("graduationYear");
    if (!specialization) missingFields.push("specialization");
    if (!currentRole) missingFields.push("currentRole");

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Create alumni profile
    const alumniProfile = await AlumniProfile.create({
      userId: session.user.id,
      graduationYear,
      education: education || [],
      workExperience: workExperience || [],
      specialization,
      currentRole,
      bio: bio || "",
      avatar: avatar || "",
      availableForMentorship: false,
      isMentor: false,
      skills: skills || [],
      socialLinks: socialLinks || {}
    });

    // Update user role to alumni
    await User.findByIdAndUpdate(session.user.id, { role: "alumni" });

    return NextResponse.json({
      message: "Alumni profile created successfully",
      alumni: alumniProfile
    }, { status: 201 });

  } catch (error) {
    console.error("Error creating alumni profile:", error);
    return NextResponse.json(
      { error: "Failed to create alumni profile" },
      { status: 500 }
    );
  }
}