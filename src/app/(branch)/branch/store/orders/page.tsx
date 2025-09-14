import Orders from "@/components/BranchOrder";
import api from "@/lib/axiosInstance";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";

const OrdersPage = async () => {
  const session = await getServerSession(authOptions);
  const branchId = session?.user?.branch;

  let orders = [];

  try {
    const response = await api.get(`/chapters/${branchId}/store/orders`, {
      headers: {
        Cookie: "", // if needed depending on how you're passing session
      },
    });
    orders = response.data.orders;
  } catch (error) {
    console.error("Failed to fetch branch orders", error);
  }

  return <Orders orders={orders} />;
};

export default OrdersPage;
