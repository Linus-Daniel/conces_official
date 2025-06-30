import api from '@/lib/axiosInstance';

type SendOrderEmailParams = {
  to: string;
  name: string;
  orderId: string;
  status: string;
};

export const sendOrderStatusEmail = async ({
  to,
  name,
  orderId,
  status,
}: SendOrderEmailParams) => {
  const subject = `Order #${orderId} - Status Updated to ${status}`;
  const content = {
    type: "html",
    body: `
      <div style="
        font-family: 'Arial', sans-serif;
        max-width: 600px;
        margin: 0 auto;
        border: 1px solid #e1e1e1;
        border-radius: 8px;
        overflow: hidden;
      ">
        <!-- Header with Conces Store branding -->
        <div style="
          background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
          padding: 30px 20px;
          text-align: center;
          color: #ffd700;
        ">
          <h1 style="
            margin: 0;
            font-size: 28px;
            font-weight: bold;
            letter-spacing: 1px;
          ">CONCES STORE</h1>
          <p style="
            margin: 8px 0 0;
            font-size: 14px;
            color: rgba(255, 215, 0, 0.8);
          ">Your products at your finger tips</p>
        </div>

        <!-- Email Content -->
        <div style="padding: 30px 20px;">
          <h2 style="
            color: #0d47a1;
            margin-top: 0;
            font-size: 22px;
          ">Hi ${name},</h2>
          
          <p style="
            font-size: 16px;
            line-height: 1.6;
            color: #333;
          ">Your order <strong style="color: #1a237e;">#${orderId}</strong> status has been updated to:</p>
          
          <div style="
            background-color: #ffd700;
            color: #1a237e;
            padding: 12px;
            border-radius: 6px;
            text-align: center;
            margin: 20px 0;
            font-weight: bold;
            font-size: 18px;
          ">${status}</div>
          
          <p style="
            font-size: 16px;
            line-height: 1.6;
            color: #333;
          ">We appreciate your patience and support as we work to fulfill your order with the utmost care.</p>
          
          <div style="
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e1e1e1;
            text-align: center;
          ">
            <p style="
              font-size: 14px;
              color: #666;
              margin-bottom: 20px;
            ">Thank you for shopping with <span style="color: #1a237e; font-weight: bold;">Conces Store</span>!</p>
            
            <a href="https://conces-official.vercel.app/store" style="
              display: inline-block;
              background-color: #1a237e;
              color: white;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 4px;
              font-weight: bold;
              margin-top: 10px;
            ">View Order Details</a>
          </div>
        </div>

        <!-- Footer -->
        <div style="
          background-color: #f5f5f5;
          padding: 15px 20px;
          text-align: center;
          font-size: 12px;
          color: #666;
        ">
          <p style="margin: 5px 0;">© ${new Date().getFullYear()} Conces Store. All rights reserved.</p>
          <p style="margin: 5px 0;">Need help? Contact us at support@concesstore.com</p>
        </div>
      </div>
    `,
  };

  try {
    const response = await api.post('/send-email', {
      to,
      subject,
      content,
    });

    console.log("Email sent:", response.data.message);
    return response.data;
  } catch (err) {
    console.error("Failed to send order status email", err);
    throw err;
  }
};