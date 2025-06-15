import { OrderTable } from '@/components/admin/OrderTable';
import { getOrders } from '@/lib/actions/admin';

export default async function AdminOrdersPage({
  searchParams, 
}: {
  searchParams: { page?: string; status?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const status = searchParams.status || 'all';
  const { orders, totalPages } = await getOrders(page, status);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Orders</h2>
      </div>

      <div className="bg-white rounded-lg shadow">
        <OrderTable 
          orders={orders} 
          page={page}
          totalPages={totalPages}
          status={status}
        />
      </div>
    </div>
  );
}