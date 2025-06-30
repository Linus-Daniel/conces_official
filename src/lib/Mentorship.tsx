import api from '@/lib/axiosInstance';

type MentorshipRequestEmailParams = {
  alumniEmail: string;
  alumniName: string;
  applicantMessage: string;
};

export const sendMentorshipRequestEmail = async ({
  alumniEmail,
  alumniName,
  applicantMessage,
}: MentorshipRequestEmailParams) => {
  const subject = `New Mentorship Request - Conces Store Alumni Program`;
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
        <!-- Header -->
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
          ">CONCES STORE ALUMNI</h1>
          <p style="
            margin: 8px 0 0;
            font-size: 14px;
            color: rgba(255, 215, 0, 0.8);
          ">Mentorship Program</p>
        </div>

        <!-- Content -->
        <div style="padding: 30px 20px;">
          <h2 style="
            color: #0d47a1;
            margin-top: 0;
            font-size: 22px;
          ">Hi ${alumniName},</h2>
          
          <p style="
            font-size: 16px;
            line-height: 1.6;
            color: #333;
          ">You've received a new mentorship request through the Conces Store Alumni Program.</p>
          
          <div style="
            margin: 20px 0;
            padding: 16px;
            background-color: rgba(26, 35, 126, 0.05);
            border-left: 4px solid #1a237e;
            border-radius: 0 4px 4px 0;
          ">
            <p style="
              font-style: italic;
              margin: 0;
              color: #333;
            ">"${applicantMessage}"</p>
          </div>
          
          <p style="
            font-size: 16px;
            line-height: 1.6;
            color: #333;
          ">Please respond to this email directly if you're interested in mentoring this individual.</p>
          
          <div style="
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e1e1e1;
            text-align: center;
          ">
            <a href="#" style="
              display: inline-block;
              background-color: #1a237e;
              color: white;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 4px;
              font-weight: bold;
              margin-top: 10px;
            ">View Mentorship Portal</a>
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
          <p style="margin: 5px 0;">© ${new Date().getFullYear()} Conces Store Alumni Program</p>
        </div>
      </div>
    `,
  };

  try {
    const response = await api.post('/send-email', {
      to: alumniEmail,
      subject,
      content,
    });

    console.log("Mentorship request email sent:", response.data.message);
    return response.data;
  } catch (err) {
    console.error("Failed to send mentorship request email", err);
    throw err;
  }
};