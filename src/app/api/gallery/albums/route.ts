// app/api/albums/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import Album from "@/models/Album"; // You'll need to create this model
import dbConnect from "@/lib/dbConnect";
import Chapter from "@/models/Chapter"

// GET all albums
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const chapter = await Chapter.findOne().lean();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const chapterId = searchParams.get("chapter");
    const category = searchParams.get("category");

    let query: any = {};

    if (chapterId && chapterId !== "all") {
      query.chapter = chapterId;
    } else if (session.user.chapter) {
      query.chapter = session.user.chapter;
    }

    if (category && category !== "all") {
      query.category = category;
    }

    const albums = await Album.find()
      .populate("chapter", "chapterName")
      .sort({ date: -1 })
      .lean();

    return NextResponse.json(albums);
  } catch (error) {
    console.error("Error fetching albums:", error);
    return NextResponse.json(
      { message: "Error fetching albums" },
      { status: 500 }
    );
  }
}

// POST create new album
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, images, date, tags, category } = body;

    // Validate required fields
    if (!title || !description || !images || !date) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const album = new Album({
      title,
      description,
      images: images.filter((img: string) => img.trim() !== ""),
      date,
      tags: tags || [],
      category: category || "fellowship",
      chapter: session.user.chapter,
      createdBy: session.user.id,
      createdAt: new Date(),
    });

    await album.save();
    await album.populate("chapter", "chapterName");

    return NextResponse.json(album, { status: 201 });
  } catch (error) {
    console.error("Error creating album:", error);
    return NextResponse.json(
      { message: "Error creating album" },
      { status: 500 }
    );
  }
}