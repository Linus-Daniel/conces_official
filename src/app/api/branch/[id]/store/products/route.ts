// app/api/products/branch/[id]/route.ts

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id
: string } }
) {
  await dbConnect();

  try {
    const { id } = params;
    console.log(id,"branch Id");

    const products = await Product.find({ branch: id })
      .populate('category')
      .sort({ createdAt: -1 });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Failed to fetch branch products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
