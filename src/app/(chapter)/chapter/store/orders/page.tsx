import Orders from "@/components/ChapterOrder";
import api from "@/lib/axiosInstance";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";

const OrdersPage = async () => {
  const session = await getServerSession(authOptions);
  const chapterId = session?.user?.chapter;

  let orders = [];

  try {
    const response = await api.get(`/chapters/${chapterId}/store/orders`, {
      headers: {
        Cookie: "", // if needed depending on how you're passing session
      },
    });
    orders = response.data.orders;
  } catch (error) {
    console.error("Failed to fetch chapter orders", error);
  }

  return <Orders orders={orders} />;
};

export default OrdersPage;
