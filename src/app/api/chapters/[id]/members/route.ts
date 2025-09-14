
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Branch from "@/models/Chapter"
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const branch = await Branch.find()
    await dbConnect();
    const { id: branchId } = await params;
    console.log(branchId);

    const users = await User.find({ branch: branchId }).lean().populate("branch","branchName");
    console.log(users, "Users from the branch");

    return NextResponse.json({
      status: 200,
      message: "success",
      users,
    });
  } catch (error) {
    console.error("Error fetching branch members:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}