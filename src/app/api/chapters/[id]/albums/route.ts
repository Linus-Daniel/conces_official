// app/api/chapters/[id]/albums/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import Album from "@/models/Album";
import dbConnect from "@/lib/dbConnect";

// GET albums for specific chapter
export async function GET(
  request: NextRequest,
  { params }: { params: Promise <{ id: string }> }
) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const {id} = await params

    let query: any = { chapter: id };

    if (category && category !== "all") {
      query.category = category;
    }

    const albums = await Album.find(query)
      .populate("chapter", "chapterName")
      .sort({ date: -1 })
      .lean();

    return NextResponse.json(albums);
  } catch (error) {
    console.error("Error fetching chapter albums:", error);
    return NextResponse.json(
      { message: "Error fetching albums" },
      { status: 500 }
    );
  }
}
