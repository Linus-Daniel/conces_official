import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import dbConnect from "@/lib/dbConnect";
import Chapter from "@/models/Chapter";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const userRole = session?.user.role;

  if (userRole !== "admin" && userRole !== "chapter-admin") {
    console.log("Unauthorized request");
    return NextResponse.json(
      { error: "Not authorized to make this request" },
      { status: 401 }
    );
  }

  // Await the params since it's now a Promise
  const { id } = await params;

  if (!id) {
    console.log("Missing chapter id");
    return NextResponse.json(
      { error: "Chapter ID is required" },
      { status: 400 }
    );
  }

  try {
    const chapter = await Chapter.findById(id);
    if (!chapter) {
      console.log("Chapter not found");
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    console.log("Fetch successful");
    return NextResponse.json(
      { message: "Chapter fetched successfully", chapter },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching chapter" },
      { status: 500 }
    );
  }
}

// UPDATE
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  if (role !== "admin" && role !== "chapter-admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    // Await the params since it's now a Promise
    const { id } = await params;
    const chapter = await Chapter.findByIdAndUpdate(id, body, { new: true });

    if (!chapter) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Chapter updated", chapter });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update chapter" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  if (role !== "admin") {
    return NextResponse.json(
      { error: "Only admins can delete chapteres" },
      { status: 403 }
    );
  }

  try {
    // Await the params since it's now a Promise
    const { id } = await params;
    const deleted = await Chapter.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Chapter deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete chapter" },
      { status: 500 }
    );
  }
}
