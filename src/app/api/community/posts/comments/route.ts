import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Comment from "@/models/Comment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import Post from "@/models/Post";


export async function POST(req: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { postId, content } = await req.json();

  if (!postId || !content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    // Create the comment
    const comment = await Comment.create({
      postId,
      content,
      author: {
        id: session.user.id,
        name: session.user.name,
        avatar: session.user.avatar,
        role: session.user.role,
      },
    });

    await Post.findByIdAndUpdate(postId, { $inc: { comments: 1 } });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Comment creation error:", error);
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();
  const postId = req.nextUrl.searchParams.get("postId");

  if (!postId) {
    return NextResponse.json({ error: "Post ID required" }, { status: 400 });
  }

  try {
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    return NextResponse.json(comments);
  } catch (error) {
    console.error("Failed to get comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}
