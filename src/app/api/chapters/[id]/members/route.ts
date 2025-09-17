import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Chapter from "@/models/Chapter";
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const chapter = await Chapter.find();
    await dbConnect();
    const { id: chapterId } = await params;
    console.log(chapterId);

    const users = await User.find({ chapter: chapterId })
      .lean()
      .populate("chapter", "chapterName");
    console.log(users, "Users from the chapter");

    return NextResponse.json({
      status: 200,
      message: "success",
      users,
    });
  } catch (error) {
    console.error("Error fetching chapter members:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
