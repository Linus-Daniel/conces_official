import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

export default function CartIcon() {
  // In a real app, you'd get this from your cart state
  const itemCount = 3;

  return (
    <Link href="/store/cart" className="relative p-2">
      <FaShoppingCart className="text-xl text-gray-700 hover:text-royal-DEFAULT" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-royal-DEFAULT text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
}