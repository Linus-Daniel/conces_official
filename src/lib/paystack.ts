export interface PaystackInitParams {
    email: string;
    amount: number;
    reference: string;
    metadata?: Record<string, any>;
    callback_url?: string;
  }
  
  export async function initializePayment(params: PaystackInitParams) {
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
      body: JSON.stringify(params),
    });
  
    const result = await response.json();
  
    if (!response.ok) {
      console.error("Paystack Init Error:", result); // 💥 log exact error
      throw new Error('Failed to initialize payment');
    }
  
    return result;
  }
  
  
  export async function verifyPayment(reference: string) {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );
  
    if (!response.ok) {
      throw new Error('Failed to verify payment');
    }
  
    return response.json();
  }