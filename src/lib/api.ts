import api from '@/lib/axiosInstance';

export const updateOrderStatus = async (orderId: string, newStatus: string) => {
  try {
    const response = await api.patch(`/store/orders/${orderId}/status`, {
      status: newStatus,
    });

    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};
