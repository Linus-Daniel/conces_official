import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id: chapterId } = await params;

  try {
    // Fetch all orders with at least one product from this chapter
    const orders = await Order.find({ "items.chapter": chapterId })
      .populate("user", "fullName email")
      .populate("items.product", "name price images category")
      .sort({ createdAt: -1 })
      .lean(); // convert to plain objects for easier manipulation

    const filteredOrders = orders.map((order) => {
      const chapterItems = order.items.filter(
        (item: any) => item.chapter === chapterId
      );

      const chapterTotal = chapterItems.reduce((acc: number, item: any) => {
        return acc + item.price * item.quantity;
      }, 0);

      return {
        ...order,
        items: chapterItems,
        chapterTotal,
      };
    });

    return NextResponse.json({
      status: 200,
      message: "Chapter-specific order details fetched successfully",
      orders: filteredOrders,
    });
  } catch (error) {
    console.error("Error fetching chapter orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch chapter orders" },
      { status: 500 }
    );
  }
}
