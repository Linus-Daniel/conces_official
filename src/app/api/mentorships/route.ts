import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import dbConnect from "@/lib/dbConnect";

import Mentorship from "@/models/Mentorship";

export async function POST(req: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "alumni") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    console.log(data, "data")
    const mentorship = await Mentorship.create({
      ...data
    });
    return NextResponse.json(mentorship);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create mentorship" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  
  // Authorization check - only admins, chapter-admins, and alumni can view mentorships
  if (!session || !["admin", "chapter-admin", "alumni"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let mentorships;
    
    // Different access levels based on role
    if (session.user.role === "admin") {
      // Admins can see all mentorships
      mentorships = await Mentorship.find({}).populate('mentorId menteeId', 'fullName email');
    } else if (session.user.role === "chapter-admin") {
      // Chapter-admins can see mentorships in their chapter (need to implement chapter filtering)
      mentorships = await Mentorship.find({}).populate('mentorId menteeId', 'fullName email');
    } else {
      // Alumni can only see their own mentorships
      mentorships = await Mentorship.find({
        $or: [
          { mentorId: session.user.id },
          { menteeId: session.user.id }
        ]
      }).populate('mentorId menteeId', 'fullName email');
    }

    return NextResponse.json({ mentorships, count: mentorships.length });
  } catch (error) {
    console.error('[GET ALL MENTORSHIPS ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to fetch mentorships' },
      { status: 500 }
    );
  }
}

