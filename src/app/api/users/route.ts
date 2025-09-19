// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Chapter from "@/models/Chapter";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const _ = await Chapter.find()    
    const users = await User.find({}).lean().populate("chapter", "chapterName");
    return NextResponse.json({ status: 200, message: "success", users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
