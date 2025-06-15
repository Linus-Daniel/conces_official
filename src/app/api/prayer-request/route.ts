import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import PrayerRequest from "@/models/PrayerRequest";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

async function checkAuth(request: NextRequest) {
  const session = await getServerSession({
    req: request,
    ...authOptions
  });
  if (!session?.user) {
    return null;
  }
  return session;
}
export async function GET() {
  await dbConnect();

  try {
    const prayerRequests = await PrayerRequest.find()
      .sort({ createdAt: -1 })
      .populate("creator", "fullName  image"); // include only specific fields

    return NextResponse.json(prayerRequests, { status: 200 });
  } catch (error) {
    console.error("GET /prayer error:", error);
    return NextResponse.json({ error: "Failed to fetch prayer requests" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    console.log("Database connected successfully for POST");

    const session = await checkAuth(request);
    if (!session) {
      console.warn("Unauthorized POST attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    console.log("Request body:", body);

    if (!body?.title || !body?.content) {
      console.warn("Missing fields in request:", body);
      return NextResponse.json(
        { error: "Missing required fields (title and content)" },
        { status: 400 }
      );
    }

    const newPrayerRequest = new PrayerRequest({
      title: body.title,
      content: body.content,
      creator: session.user.id,
    });

    const savedRequest = await newPrayerRequest.save();
    console.log("New prayer request created:", savedRequest);

    return NextResponse.json(savedRequest, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Failed to create prayer request" },
      { status: 500 }
    );
  }
}