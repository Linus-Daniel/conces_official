import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import User from "@/models/User";
import Product from "@/models/Product";
import PrayerRequest from "@/models/PrayerRequest";
import Chapter from "@/models/Chapter";
import Events from "@/models/Events";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // Fetch product count
    const products = await Product.countDocuments();

    // Fetch prayer request count
    const prayerRequestCount = await PrayerRequest.countDocuments();

    // Fetch event count
    const events = await Events.countDocuments();
    const users = await User.countDocuments();

    const chapters = await Chapter.countDocuments();

    return NextResponse.json({
      users,
      products,
      prayerRequestCount,
      events,
      chapters,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
