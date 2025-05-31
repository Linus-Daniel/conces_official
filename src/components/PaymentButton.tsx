import { PaystackButton } from "react-paystack";

type Props = {
  email: string;
  amount: number;
  reference?: string;
  onSuccess?: (response: any) => void;
  onClose?: () => void;
};

const PaymentButton = ({
  email,
  amount,
  reference,
  onSuccess,
  onClose,
}: Props) => {
  const publicKey = "pk_test_392c3f84a9a492459289386a4917045513366763";

  const config = {
    reference: reference || (new Date()).getTime().toString(),
    email: email,
    amount: amount * 100, // Convert to kobo
    publicKey,
    text:"Complete Order",
    channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
    label: "Nascomsoft Embedded",
    metadata: {
      custom_fields: [
        {
          display_name: "Paid via",
          variable_name: "paid_via",
          value: "react-paystack"
        }
      ]
    },
  
    onSuccess: (response: any) => {
        console.log("Payment successful", response);
        console.log("taking tou to ", `http://localhost:3000/cart?reference=${response.reference}`)
        window.location.href = `http://localhost:3000/cart?reference=${response.reference}`;
      },
      
    onClose: () => {
      console.log("Payment closed");
      if (onClose) {
        onClose();
      }
    }
  };

  
  const componentProps = {
    ...config,
    paystackOptions: {
      ...config,
    }
  };

  return (
    <PaystackButton
      {...componentProps}
      className="w-full bg-gradient-to-r from-primary to-secondary py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white hover:from-primary-dark hover:to-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
    />
  );
};

export default PaymentButton;