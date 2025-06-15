// app/api/send-email/route.ts
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

// Types for our request body
type EmailRequest = {
  to: string | string[];
  subject: string;
  content: {
    type: 'text' | 'html';
    body: string;
  };
  from?: string;
};

export async function POST(request: Request) {
  try {
    const { to, subject, content, from }: EmailRequest = await request.json();

    // Validate required fields
    if (!to || !subject || !content?.body) {
      return NextResponse.json(
        { error: 'Missing required fields (to, subject, content)' },
        { status: 400 }
      );
    }

    // Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Prepare email options
    const mailOptions = {
      from: from || `"Your App" <${process.env.EMAIL_USER}>`,
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
      ...(content.type === 'html'
        ? { html: content.body }
        : { text: content.body }),
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error sending email',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}