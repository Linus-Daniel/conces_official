import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import Order from '@/models/Order';
import User from '@/models/User';
import Category from '@/models/Category';

export async function getDashboardStats() {
  await dbConnect();

  const [
    totalProducts,
    totalOrders,
    totalRevenueResult,
    totalCustomers,
  ] = await Promise.all([
    Product.countDocuments(),
    Order.countDocuments(),
    Order.aggregate([
      { $match: { status: 'DELIVERED' } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]),
    User.countDocuments({ role: 'USER' }),
  ]);

  return {
    totalProducts,
    totalOrders,
    totalRevenue: totalRevenueResult[0]?.total || 0,
    totalCustomers,
  };
}

export async function getProducts(page: number = 1, search: string = '') {
  await dbConnect();
  const limit = 10;
  const skip = (page - 1) * limit;

  const query = search
    ? { name: { $regex: search, $options: 'i' } }
    : {};

  const [products, total] = await Promise.all([
    Product.find(query)
      .populate('category')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    Product.countDocuments(query),
  ]);

  return {
    products: JSON.parse(JSON.stringify(products)),
    totalPages: Math.ceil(total / limit),
  };
}

export async function getProductById(id: string) {
  await dbConnect();
  const product = await Product.findById(id).populate('category');
  return product ? JSON.parse(JSON.stringify(product)) : null;
}

export async function getCategories() {
  await dbConnect();
  const categories = await Category.find();
  return JSON.parse(JSON.stringify(categories));
}

export async function getOrders(page: number = 1, status: string = 'all') {
  await dbConnect();
  const limit = 10;
  const skip = (page - 1) * limit;

  const query = status === 'all' ? {} : { status };

  const [orders, total] = await Promise.all([
    Order.find(query)
      .populate('user')
      .populate('items.product')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    Order.countDocuments(query),
  ]);

  return {
    orders: JSON.parse(JSON.stringify(orders)),
    totalPages: Math.ceil(total / limit),
  };
}