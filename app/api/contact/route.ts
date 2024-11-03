import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: any, res: any) {
    const { name, email, phone, message } = await req.json();

  if (!name || !email || !phone || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Configure Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SENDER_MAIL,
      pass: process.env.SENDER_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `RLexicon - "${name}" <${email}>`,
      to: 'reshablath@gmail.com',
      subject: 'RLexicon - New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
    });

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
