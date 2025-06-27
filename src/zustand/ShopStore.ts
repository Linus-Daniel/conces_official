// store/ecommerceStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
  rating: number;
};

type CartItem = {
  product: Product;
  quantity: number;
};

type Order = {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
};

type User = {
  id: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
};

type EcommerceState = {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  user: User | null;
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  checkout: () => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  getCartTotal: () => number;
  getCartItemCount: () => number;
};

export const useEcommerceStore = create<EcommerceState>()(
  persist(
    (set, get) => ({
      products: [],
      cart: [],
      orders: [],
      user: null,
      loading: false,
      error: null,

      // Fetch products from API
      fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          const mockProducts: Product[] = [
            {
              id: '1',
              name: 'Premium Headphones',
              price: 199.99,
              description: 'Noise-cancelling wireless headphones',
              image: '/headphones.jpg',
              category: 'Electronics',
              stock: 50,
              rating: 4.5,
            },
            {
              id: '2',
              name: 'Smart Watch',
              price: 249.99,
              description: 'Fitness tracking and notifications',
              image: '/smartwatch.jpg',
              category: 'Electronics',
              stock: 30,
              rating: 4.2,
            },
            // Add more mock products as needed
          ];
          set({ products: mockProducts, loading: false });
        } catch (err) {
          set({ error: 'Failed to fetch products', loading: false });
        }
      },

      // Add product to cart
      addToCart: (product, quantity = 1) => {
        const { cart } = get();
        const existingItem = cart.find((item) => item.product.id === product.id);

        if (existingItem) {
          // Update quantity if item already in cart
          set({
            cart: cart.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          // Add new item to cart
          set({ cart: [...cart, { product, quantity }] });
        }
      },

      // Remove product from cart
      removeFromCart: (productId) => {
        const { cart } = get();
        set({ cart: cart.filter((item) => item.product.id !== productId) });
      },

      // Update cart item quantity
      updateCartItemQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        const { cart } = get();
        set({
          cart: cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      // Clear the cart
      clearCart: () => {
        set({ cart: [] });
      },

      // Checkout process
      checkout: async () => {
        const { cart, user, orders } = get();
        if (!user) {
          set({ error: 'You must be logged in to checkout' });
          return;
        }

        if (cart.length === 0) {
          set({ error: 'Your cart is empty' });
          return;
        }

        set({ loading: true, error: null });

        try {
          // In a real app, this would be an API call
          const newOrder: Order = {
            id: `order-${Date.now()}`,
            items: [...cart],
            total: get().getCartTotal(),
            date: new Date().toISOString(),
            status: 'pending',
          };

          set({
            orders: [...orders, newOrder],
            cart: [],
            loading: false,
          });
        } catch (err) {
          set({ error: 'Checkout failed', loading: false });
        }
      },

   
      // Helper to get product by ID
      getProductById: (id) => {
        return get().products.find((product) => product.id === id);
      },

      // Calculate cart total
      getCartTotal: () => {
        return get().cart.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      // Calculate total number of items in cart
      getCartItemCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'ecommerce-store', // name for the persisted store
      storage: createJSONStorage(() => localStorage), // use localStorage
      partialize: (state) => ({
        user: state.user,
        cart: state.cart,
        orders: state.orders,
      }), // persist only these states
    }
  )
);