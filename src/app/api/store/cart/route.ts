import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Cart from '@/models/Cart';
import Product from '@/models/Product';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const cart = await Cart.findOne({ user: session.user.id })
      .populate('items.product');
    return NextResponse.json(cart || { items: [], total: 0 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { productId, quantity } = await request.json();
    
    // Get product price
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: session.user.id });
    
    if (!cart) {
      cart = new Cart({
        user: session.user.id,
        items: [],
        total: 0,
      });
    }

    // Check if product already in cart
    const existingItem = cart.items.find(
      (item:any) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        branch:product.branch,
        price: product.price,
      });
    }

    await cart.save();
    await cart.populate('items.product');
    
    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update cart' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { productId } = await request.json();
    const cart = await Cart.findOne({ user: session.user.id });

    if (!cart) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      );
    }

    cart.items = cart.items.filter(
      (item:any) => item.product.toString() !== productId
    );

    await cart.save();
    await cart.populate('items.product');
    
    return NextResponse.json(cart);
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to update cart',
        message:error
       },
      { status: 500 }
    );
  }
}


export async function PUT(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { productId, quantity } = await request.json();

    if (quantity < 1) {
      return NextResponse.json({ error: 'Invalid quantity' }, { status: 400 });
    }

    const cart = await Cart.findOne({ user: session.user.id });

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    const item = cart.items.find(
      (item: any) => item.product.toString() === productId
    );

    if (!item) {
      return NextResponse.json({ error: 'Product not in cart' }, { status: 404 });
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate('items.product');

    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update quantity' },
      { status: 500 }
    );
  }
}
