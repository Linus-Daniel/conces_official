import { cookies } from "next/headers";
import OrdersList from "@/components/order/OrderList";
import api from "@/lib/axiosInstance";

// Required to avoid static rendering issues since cookies are used
export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  try {
    // ✅ Grab all cookies and format them into a valid header string
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const response = await api.get("/store/orders", {
      headers: {
        Cookie: cookieHeader, // ✅ Correct format
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
