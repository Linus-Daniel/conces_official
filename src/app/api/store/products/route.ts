import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import { authOptions } from "@/lib/next-auth";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  await dbConnect();

  try {
    // Only fetch approved products
    const products = await Product.find({ approved: true })
      .populate("category")
      .sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (
    session?.user?.role !== "admin" &&
    session?.user?.role !== "branch-admin"
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Set approved to true if user is admin, otherwise leave as false (default)
    const productData = {
      ...body,
      approved: session?.user?.role === "admin" ? true : false,
    };

    const product = await Product.create(productData);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product", message: error },
      { status: 500 }
    );
  }
}
