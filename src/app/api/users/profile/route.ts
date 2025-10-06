// app/api/user/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Chapter from "@/models/Chapter";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";


export async function GET(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
  const session = await getServerSession(authOptions);
  const user = session?.user ?? null;
  
  try {
    await dbConnect();
    const _ = await Chapter.find();
    const id = user?.id
    const userProfile = await User.findById(id).populate("chapter", "chapterName");
    return NextResponse.json({ status: 200, message: "success", userProfile });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const { id } = params;
        const body = await request.json();
        const updatedUser = await User.findByIdAndUpdate(id, body, { new: true }).lean();
        if (!updatedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ status: 200, message: "User updated", user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const { id } = params;
        const deletedUser = await User.findByIdAndDelete(id).lean();
        if (!deletedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ status: 200, message: "User deleted", user: deletedUser });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}