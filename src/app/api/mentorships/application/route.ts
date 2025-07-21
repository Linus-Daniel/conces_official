import { authOptions } from "@/lib/next-auth";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import Mentorship from "@/models/Mentorship";
import AlumniProfile from "@/models/Alumni";
import MentorshipApplication from "@/models/MentorshipApplication";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = session.user;
  const mentorship = Mentorship.find({})
  const alumni = AlumniProfile.find({})
  const mentor = user.role === "alumni" ? await AlumniProfile.findOne({ userId: user.id }) : null;
  const mentorId = mentor ? mentor._id : null;
  console.log(mentorId, "mentorId")
  try {
    
    const queryField = user.role === "alumni" ? "mentorId" : "studentId";

    console.log("✅ Registered Mongoose models:", mongoose.modelNames());
    console.log("🔍 Fetching mentorships for user:", user.id, `as a ${queryField}`);

    const mentorships = await MentorshipApplication.find({
      [queryField]: user.role === "alumni" ? mentorId : user.id,
    })
      .populate("mentorship", "name topics")
      .populate("mentorId")
      .populate("studentId");
  

  

    return NextResponse.json({ mentorships }, { status: 200 });
  } catch (error) {
    console.error("❌ Failed to fetch mentorships:", error);
    return NextResponse.json(
      { error: "Failed to fetch mentorships" },
      { status: 500 }
    );
  }
}
        // toast({
        //   title: "Error",
        //   description: "Failed to load applications",        // toast({
        //   title: "Error",
        //   description: "Failed to load applications",
        //   variant: "destructive",
        // });
        //   variant: "destructive",
        // });