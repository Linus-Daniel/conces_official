import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

// Escape special regex characters
const escapeRegex = (str: string): string => {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ message: "Query parameter required" }, { status: 400 });
  }

  await dbConnect();

  const safeQuery = escapeRegex(query);
  const regex = new RegExp(safeQuery, "i");

  const products = await Product.find({
    $or: [
      { name: { $regex: regex } },
      { category: { $regex: regex } },
    ],
  }).limit(20);

  if (!products || products.length === 0) {
    return NextResponse.json({ message: "No products found", products: [] }, { status: 200 });
  }

  return NextResponse.json({ message: "Search successful", products }, { status: 200 });
}
