
import OrderCard from './OrderCard';
import Pagination from '../ui/Pagination';
import { Order } from '@/types'
import OrderFilter from './OrderFilter';

interface OrdersListProps {
  orders: Order[];
}

export default function OrdersList({ orders }: OrdersListProps) {
  return (
    <>
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-royal-900">My Orders</h1>
              <OrderFilter />
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>

            <Pagination 
              currentPage={1} 
              totalPages={8} 
              totalItems={24} 
              itemsPerPage={3} 
            />
          </div>
        </div>
      </main>

    </>
  );
}