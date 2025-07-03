import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const branchId = params.id;

  try {
    // Fetch all orders with at least one product from this branch
    const orders = await Order.find({ 'items.branch': branchId })
      .populate('user', 'fullName email')
      .populate('items.product', 'name price images category')
      .sort({ createdAt: -1 })
      .lean(); // convert to plain objects for easier manipulation

    const filteredOrders = orders.map(order => {
      const branchItems = order.items.filter((item: any) => item.branch === branchId);

      const branchTotal = branchItems.reduce((acc: number, item: any) => {
        return acc + (item.price * item.quantity);
      }, 0);

      return {
        ...order,
        items: branchItems,
        branchTotal,
      };
    });

    return NextResponse.json({
      status: 200,
      message: 'Branch-specific order details fetched successfully',
      orders: filteredOrders,
    });
  } catch (error) {
    console.error('Error fetching branch orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch branch orders' },
      { status: 500 }
    );
  }
}
