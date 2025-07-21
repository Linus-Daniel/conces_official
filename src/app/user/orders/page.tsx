// app/store/orders/page.tsx
import { cookies } from "next/headers";
import OrdersList from "@/components/order/OrderList";
import api from "@/lib/axiosInstance";

export default async function OrdersPage() {
  try {
    const cookieStore = cookies();

    const response = await api.get("/store/orders", {
      headers: {
        Cookie: cookieStore.toString(), 
      },
      withCredentials: true,
    });

    const orders = response.data?.orders;
    console.log(orders);

    return (
      <div className="min-h-screen bg-royal-50">
        <OrdersList orders={orders} />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch orders:", error);

    return (
      <div className="min-h-screen bg-rose-50 text-center py-12">
        <h1 className="text-xl font-semibold text-rose-700">
          Failed to load orders.
        </h1>
        <p className="text-gray-600 mt-2">Please try again later.</p>
      </div>
    );
  }
}
