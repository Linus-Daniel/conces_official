import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  await dbConnect();
  
  try {
    const products = await Product.find().populate('category').sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  
  if (session?.user?.role === 'admin' || session?.user?.role === 'branch-admin') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const product = await Product.create(body);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}