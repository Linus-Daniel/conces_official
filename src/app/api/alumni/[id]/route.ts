// app/api/alumni/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AlumniProfile from "@/models/Alumni";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";

export async function GET(
  request: NextRequest,
  { params }: { params:  Promise< { id: string }> }
) {
  try {
    await dbConnect();
const{id} = await params
    const session = await getServerSession(authOptions);
    if (!session || !["admin", "chapter-admin"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const alumni = await AlumniProfile.findById(id).populate(
      "userId",
      "name email"
    );

    if (!alumni) {
      return NextResponse.json({ error: "Alumni not found" }, { status: 404 });
    }

    return NextResponse.json({ alumni });
  } catch (error) {
    console.error("Error fetching alumni:", error);
    return NextResponse.json(
      { error: "Failed to fetch alumni" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const {id} = await params

    const session = await getServerSession(authOptions);
    if (!session || !["admin", "chapter-admin"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const alumni = await AlumniProfile.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).populate("userId", "name email");

    if (!alumni) {
      return NextResponse.json({ error: "Alumni not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Alumni updated", alumni });
  } catch (error) {
    console.error("Error updating alumni:", error);
    return NextResponse.json(
      { error: "Failed to update alumni" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const {id} = await params

    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const alumni = await AlumniProfile.findByIdAndDelete(id);

    if (!alumni) {
      return NextResponse.json({ error: "Alumni not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Alumni deleted" });
  } catch (error) {
    console.error("Error deleting alumni:", error);
    return NextResponse.json(
      { error: "Failed to delete alumni" },
      { status: 500 }
    );
  }
}
