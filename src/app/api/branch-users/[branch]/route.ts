import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET(request: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const userRole = session?.user.role;

  if (userRole !== "admin" && userRole !== "branch-admin") {
    console.log("Attempt to fetch users by unauthorized user");
    return NextResponse.json(
      { error: "Unauthorized request" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const branch = searchParams.get("branch");

  if (!branch) {
    console.log("Missing branch parameter in query");
    return NextResponse.json(
      { error: "Branch parameter is required" },
      { status: 400 }
    );
  }

  try {
    const users = await User.find({ branch });

    if (!users.length) {
      console.log("No users found for branch:", branch);
      return NextResponse.json(
        { error: "No users found for the specified branch" },
        { status: 404 }
      );
    }

    console.log("Users fetched successfully for branch:", branch);
    return NextResponse.json(
      { message: "Fetch successful", users },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching branch users:", error);
    return NextResponse.json(
      { error: "Server error while fetching users" },
      { status: 500 }
    );
  }
}
