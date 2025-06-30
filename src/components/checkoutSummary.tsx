import { Button } from '@/components/ui/button';
import { ICart } from '@/models/Cart';

export default function CartSummary({ cart }: { cart: ICart }) {
  return (
    <div className="bg-royal-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      
      <div className="space-y-2 mb-6">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{cart.total}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between border-t pt-2 mt-2">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">{cart.total}</span>
        </div>
      </div>

      <Button className="w-full" >
        Proceed to Payment
      </Button>
    </div>
  );
}