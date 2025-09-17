import { NextRequest, NextResponse } from "next/server";
import AlumniProfile from "@/models/Alumni";
import Connection from "@/models/Connect";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";

export async function GET(request: NextRequest) {
  await dbConnect();

  // Pass the request to getServerSession so it can access cookies
  const session = await getServerSession(authOptions);
  console.log("Session in Alumni GET:", session);

  if (!session || session.user.role !== "alumni") {
    console.log("Invalid User role", session?.user?.role);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const profile = await AlumniProfile.findOne({
      userId: session.user.id,
    }).populate("userId", "fullName email avatar role chapter");

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const connections = await Connection.find({
      $or: [
        { alumniId: session.user.id },
        { connectedUserId: session.user.id },
      ],
      status: "connected",
    }).populate("alumniId connectedUserId", "fullName avatar currentRole");

    const mentorshipRequests = await Connection.find({
      alumniId: session.user.id,
      status: "pending",
    }).populate("connectedUserId", "fullName avatar");

    return NextResponse.json({
      profile,
      connections,
      mentorshipRequests,
    });
  } catch (error) {
    console.error("Alumni GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch alumni data" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "alumni") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    const existingProfile = await AlumniProfile.findOne({
      userId: session.user.id,
    });

    if (existingProfile) {
      // Update existing profile
      await AlumniProfile.updateOne({ userId: session.user.id }, data);
      return NextResponse.json(
        { message: "Profile updated successfully" },
        { status: 200 }
      );
    } else {
      // Create new profile
      const newProfile = new AlumniProfile({
        ...data,
        userId: session.user.id,
        avatar: session.user.avatar || "https://example.com/default-avatar.png", // Default avatar if not provided
      });
      await newProfile.save();
      return NextResponse.json(
        { message: "Profile created successfully" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Alumni POST error:", error);
    return NextResponse.json(
      { error: "Failed to save alumni profile" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "alumni") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const updatedProfile = await AlumniProfile.findOneAndUpdate(
      { userId: session.user.id },
      {
        $set: {
          graduationYear: body.graduationYear,
          specialization: body.specialization,
          currentRole: body.currentRole,
          bio: body.bio,
          isMentor: body.isMentor,
          availableForMentorship: body.availableForMentorship,
          skills: body.skills,
          education: body.education,
          experience: body.workExperience,
          socialLinks: body.socialLinks,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("[PATCH PROFILE]", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
