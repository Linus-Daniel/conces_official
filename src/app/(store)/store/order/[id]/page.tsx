import OrdersList from '@/components/account/OrdersList';
import { getOrders } from '@/lib/api/orders';
import { OrderStatus } from '@/types/order';

export default async function OrdersPage() {
  // In a real app, you would fetch this from your API
  const orders = await getOrders();
  
  return (
    <div className="min-h-screen bg-royal-50">
      <OrdersList orders={orders} />
    </div>
  );
}