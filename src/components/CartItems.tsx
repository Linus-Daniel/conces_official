"use client";

import { useState, ChangeEvent } from "react";

type CartItemType = {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
  category?: string;
};

type CartItemProps = {
  item: CartItemType;
  onUpdateQuantity: (id: CartItemType["id"], quantity: number) => void;
  onRemove: (id: CartItemType["id"]) => void;
};

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(newQuantity);
    onUpdateQuantity(item.id, newQuantity);
  };

  return (
    <div className="flex py-4">
      <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
        <img
          src={item.image_url || "/placeholder-product.jpg"}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
          <button
            onClick={() => onRemove(item.id)}
            className="text-gray-500 hover:text-red-500"
          >
            Remove
          </button>
        </div>

        <div className="mt-1 text-sm text-gray-500">{item.category}</div>

        <div className="mt-2 flex justify-between items-center">
          <div className="flex items-center">
            <label htmlFor={`quantity-${item.id}`} className="sr-only">
              Quantity
            </label>
            <select
              id={`quantity-${item.id}`}
              value={quantity}
              onChange={handleQuantityChange}
              className="border border-gray-300 rounded text-sm py-1 px-2"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="text-sm font-medium text-gray-900">
            ₦{(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
