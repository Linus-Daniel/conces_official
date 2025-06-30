import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";

export async function POST(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 });

  }


  const { role, name, avatar, id: userId } = session.user;
  console.log(session.user.avatar)
  if (role === "student") {
    return new NextResponse("Students can't post.", { status: 403 });
  }

  const { title, content, type, images } = await req.json();

  const newPost = await Post.create({
    title,
    content,
    type,
    author: {
      name,
      avatar,
      role,
      userId,
    },
    date: new Date().toLocaleString(),
    images,
  });

  return NextResponse.json(newPost, { status: 201 });
}

export async function GET() {
  await dbConnect();
  const posts = await Post.find().sort({ createdAt: -1 });
  return NextResponse.json(posts);
}
