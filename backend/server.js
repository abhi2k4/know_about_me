import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Update CORS to accept your frontend URL
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Add a basic health check route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'thormothe.abhishek@gmail.com', // Your email
      subject: `You have a message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              .email-container {
                font-family: Arial, sans-serif;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #e1e1e1;
                border-radius: 5px;
              }
              .header {
                background: linear-gradient(to right, #3b82f6, #8b5cf6);
                color: white;
                padding: 20px;
                border-radius: 5px 5px 0 0;
                margin: -20px -20px 20px -20px;
              }
              .content {
                line-height: 1.6;
                color: #333;
              }
              .field {
                margin-bottom: 15px;
                padding: 15px;
                background-color: #f8f9fa;
                border-radius: 4px;
              }
              .label {
                font-weight: bold;
                color: #4b5563;
                margin-bottom: 5px;
                display: block;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="header">
                <h2 style="margin: 0;">New Contact Form Submission</h2>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">Name:</span>
                  ${name}
                </div>
                <div class="field">
                  <span class="label">Email:</span>
                  ${email}
                </div>
                <div class="field">
                  <span class="label">Message:</span>
                  ${message.replace(/\n/g, '<br>')}
                </div>
                <p style="color: #6b7280; font-size: 0.875rem; margin-top: 20px;">
                  This message was sent from your portfolio contact form.
                </p>
              </div>
            </div>
          </body>
        </html>
      `
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});