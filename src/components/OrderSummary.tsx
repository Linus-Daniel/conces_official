type OrderItem = {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
  };
  
  type Props = {
    items: OrderItem[];
    total: number;
  };
  
  export default function OrderSummary({ items, total }: Props) {
    return (
      <div className="bg-conces-light p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-conces-blue mb-4">Order Summary</h2>
  
        <div className="space-y-3 mb-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <div className="flex items-center">
                <span className="text-gray-600">{item.quantity} ×</span>
                <span className="ml-2 font-medium">{item.name}</span>
              </div>
              <div>₦{(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
  
        <div className="border-t pt-3 space-y-2">
          <div className="flex justify-between font-medium">
            <span>Subtotal</span>
            <span>₦{total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Tax</span>
            <span>Calculated at checkout</span>
          </div>
        </div>
  
        <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₦{total.toFixed(2)}</span>
        </div>
      </div>
    );
  }
  