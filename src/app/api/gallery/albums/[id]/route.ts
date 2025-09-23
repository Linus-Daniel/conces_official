// app/api/albums/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import Album from "@/models/Album";
import  dbConnect  from "@/lib/dbConnect";

// GET single album
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params
    await dbConnect();

    const album = await Album.findById(id)
      .populate("chapter", "chapterName")
      .lean();

    if (!album) {
      return NextResponse.json({ message: "Album not found" }, { status: 404 });
    }

    return NextResponse.json(album);
  } catch (error) {
    console.error("Error fetching album:", error);
    return NextResponse.json(
      { message: "Error fetching album" },
      { status: 500 }
    );
  }
}

// PUT update album
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session ) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, images, date, tags, category } = body;

    const album = await Album.findById(id);
    if (!album) {
      return NextResponse.json({ message: "Album not found" }, { status: 404 });
    }

    // Check if user has permission to update this album
    const userRole = session.user.role;
    const canEdit =
      userRole === "admin" ||
      userRole === "chapter-admin" ||
      album.createdBy.toString() === session.user.id;

    if (!canEdit) {
      return NextResponse.json(
        { message: "Permission denied" },
        { status: 403 }
      );
    }

    // Update album
    album.title = title || album.title;
    album.description = description || album.description;
    album.images = images
      ? images.filter((img: string) => img.trim() !== "")
      : album.images;
    album.date = date || album.date;
    album.tags = tags || album.tags;
    album.category = category || album.category;
    album.updatedAt = new Date();

    await album.save();
    await album.populate("chapter", "chapterName");

    return NextResponse.json(album);
  } catch (error) {
    console.error("Error updating album:", error);
    return NextResponse.json(
      { message: "Error updating album" },
      { status: 500 }
    );
  }
}

// DELETE album
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const album = await Album.findById(id);
    if (!album) {
      return NextResponse.json({ message: "Album not found" }, { status: 404 });
    }

    // Check if user has permission to delete this album
    const userRole = session.user.role;
    const canDelete =
      userRole === "admin" ||
      userRole === "chapter-admin" ||
      album.createdBy.toString() === session.user.id;

    if (!canDelete) {
      return NextResponse.json(
        { message: "Permission denied" },
        { status: 403 }
      );
    }

    await Album.findByIdAndDelete(id);

    return NextResponse.json({ message: "Album deleted successfully" });
  } catch (error) {
    console.error("Error deleting album:", error);
    return NextResponse.json(
      { message: "Error deleting album" },
      { status: 500 }
    );
  }
}
