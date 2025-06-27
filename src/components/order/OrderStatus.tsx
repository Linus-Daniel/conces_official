import { OrderStatus as Status } from "@/types";

interface OrderStatusProps {
  status: Status;
  progress: number;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
}

export default function OrderStatus({
  status,
  progress,
  trackingNumber,
  carrier,
  estimatedDelivery
}: OrderStatusProps) {
  const steps = [
    { id: 'placed', label: 'Order Placed', date: 'Oct 15', completed: true },
    { id: 'processed', label: 'Processed', date: 'Oct 16', completed: true },
    { id: 'shipped', label: 'Shipped', date: 'Oct 18', completed: true },
    { 
      id: 'delivered', 
      label: 'Delivered', 
      date: `Est. ${estimatedDelivery.split(' ').slice(0, 2).join(' ')}`, 
      completed: status === 'delivered' 
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold text-royal-900 mb-6">Order Status</h2>
      
      <div className="relative">
        {/* Progress Bar */}
        <div className="overflow-hidden h-2 mb-10 text-xs flex rounded bg-gray-200">
          <div 
            style={{ width: `${progress}%` }} 
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gold-DEFAULT"
          ></div>
        </div>
        
        {/* Steps */}
        <div className="flex justify-between -mt-8">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <div className={`rounded-full h-8 w-8 ${step.completed ? 'bg-gold-DEFAULT text-white' : 'bg-gray-300 text-gray-600'} flex items-center justify-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xs font-medium mt-2 text-gray-700">{step.label}</span>
              <span className="text-xs text-gray-500">{step.date}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-royal-50 border border-royal-100 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-royal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-royal-900">Tracking Information</h3>
            <div className="mt-2 text-sm text-royal-700">
              <p>Your order is on its way! Track your package with the following information:</p>
              <p className="mt-2 font-medium">Tracking number: <span className="font-normal">{trackingNumber}</span></p>
              <p className="mt-1 font-medium">Carrier: <span className="font-normal">{carrier}</span></p>
              <a href="#" className="mt-2 inline-flex items-center text-gold-600 hover:text-gold-800">
                Track package
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}