
// app/api/blog/[slug]/like/route.ts - POST like blog
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();

    const blog = await Blog.findOne({ slug: params.slug });

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    blog.likes += 1;
    await blog.save();

    return NextResponse.json({
      success: true,
      likes: blog.likes,
    });
  } catch (error) {
    console.error("Error liking blog:", error);
    return NextResponse.json(
      { success: false, error: "Failed to like blog" },
      { status: 500 }
    );
  }
}

