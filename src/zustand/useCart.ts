import { create } from 'zustand';
import { toast } from 'react-toastify';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // optional for redirect
import api from '@/lib/axiosInstance';

interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    stock: number;
  };
  quantity: number;
  price: number;
}

interface Cart {
  items: CartItem[];
  total: number;
}

interface CartState {
  cart: Cart;
  loading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
}

const useCart = create<CartState>((set) => ({
  cart: { items: [], total: 0 },
  loading: false,

  fetchCart: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get('/store/cart');
      set({ cart: data, loading: false });
    } catch (err) {
      toast.error('Failed to fetch cart');
      set({ loading: false });
    }
  },

  addToCart: async (productId, quantity = 1) => {
    set({ loading: true });

    // 🔐 Check if user is authenticated
    const session = await getSession();
    if (!session) {
      set({ loading: false });
      toast.info('Please sign in to add to cart');
      return signIn(); // Redirect to login page
    }

    try {
      const { data } = await api.post('/store/cart', { productId, quantity });
      set({ cart: data, loading: false });
      toast.success('Added to cart');
    } catch (err) {
      toast.error('Failed to add to cart');
      set({ loading: false });
    }
  },

  removeFromCart: async (productId) => {
    set({ loading: true });
    try {
      const { data } = await api.delete('/store/cart', { data: { productId } });
      set({ cart: data, loading: false });
      toast.info('Item removed');
    } catch (err) {
      toast.error('Failed to remove item');
      set({ loading: false });
    }
  },

  updateQuantity: async (productId, quantity) => {
    set({ loading: true });
    try {
      const { data } = await api.put('/store/cart', { productId, quantity });
      set({ cart: data, loading: false });
      toast.success('Quantity updated');
    } catch (err) {
      toast.error('Failed to update quantity');
      set({ loading: false });
    }
  },
}));

export default useCart;
