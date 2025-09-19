// app/api/blog/[slug]/comment/route.ts - POST new comment
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();

    const body = await request.json();
    const { author, content } = body;

    if (!author?.name || !author?.email || !content) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const blog = await Blog.findOne({ slug: params.slug });

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    const comment = {
      author,
      content,
      likes: 0,
      approved: false, // Comments need approval
      createdAt: new Date(),
    };

    await blog.addComment(comment);

    return NextResponse.json({
      success: true,
      message: "Comment submitted for approval",
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add comment" },
      { status: 500 }
    );
  }
}
