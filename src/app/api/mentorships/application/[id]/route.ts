import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import MentorshipApplication from "@/models/MentorshipApplication";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const {status} = await req.json();
  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      { error: "Mentorship ID is required" },
      { status: 400 }
    );
  }

  if (!session || !user || user.role !== "alumni") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const application = await MentorshipApplication.findById(id);
    if (!application) {
      return NextResponse.json(
        { error: "Mentorship application not found" },
        { status: 404 }
      );
    }
    if (application.status === "accepted") {
      return NextResponse.json(
        { error: "Application already accepted" },
        { status: 400 }
      );
    }
    const updatedApplication = await MentorshipApplication.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    return NextResponse.json(updatedApplication, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: error,
      status: 500,
    });
  }
}
