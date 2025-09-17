import { authOptions } from "@/lib/next-auth";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET(request: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const userRole = session?.user.role;

  if (userRole !== "admin" && userRole !== "chapter-admin") {
    console.log("Attempt to fetch users by unauthorized user");
    return NextResponse.json(
      { error: "Unauthorized request" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const chapter = searchParams.get("chapter");

  if (!chapter) {
    console.log("Missing chapter parameter in query");
    return NextResponse.json(
      { error: "Chapter parameter is required" },
      { status: 400 }
    );
  }

  try {
    const users = await User.find({ chapter });

    if (!users.length) {
      console.log("No users found for chapter:", chapter);
      return NextResponse.json(
        { error: "No users found for the specified chapter" },
        { status: 404 }
      );
    }

    console.log("Users fetched successfully for chapter:", chapter);
    return NextResponse.json(
      { message: "Fetch successful", users },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching chapter users:", error);
    return NextResponse.json(
      { error: "Server error while fetching users" },
      { status: 500 }
    );
  }
}
