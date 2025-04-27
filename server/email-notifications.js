import nodemailer from 'nodemailer';
import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fetch from 'node-fetch';

// Set up dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

const { Client } = pg;

// Configure a more secure email transporter with better error handling
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD // Use app password instead of regular password for better security
  },
  tls: {
    rejectUnauthorized: false // Only use in development if needed
  }
});

// Verify the transporter connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('Email setup error:', error);
  } else {
    console.log('Email server ready for sending notifications');
  }
});

// Configure database client with better error handling
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Connect to database with better error recovery
const connectDB = async () => {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');
    
    // Set up notification listener
    await client.query('LISTEN new_contact_message');
    console.log('Listening for new contact messages');
    
    // Set up the notification handler
    client.on('notification', handleNotification);
    
    // Test subject column existence
    await testSubjectColumn();
  } catch (error) {
    console.error('Database connection error:', error);
    
    // Retry connection after delay
    console.log('Retrying connection in 10 seconds...');
    setTimeout(connectDB, 10000);
  }
};

// Handle database notifications by sending emails
async function handleNotification(msg) {
  try {
    console.log('Received notification on channel:', msg.channel);
    console.log('Raw payload received:', typeof msg.payload, msg.payload?.substring(0, 50) + '...');
    
    let data;
    try {
      // Try to parse the payload as JSON
      data = JSON.parse(msg.payload);
      console.log('Successfully parsed payload as JSON');
    } catch (jsonError) {
      console.warn('Payload is not valid JSON, treating as plain text message');
      
      // Check if it looks like a text notification about a contact message
      const isContactRelated = typeof msg.payload === 'string' && 
        (msg.payload.toLowerCase().includes('contact') || 
         msg.payload.toLowerCase().includes('message') ||
         msg.payload.toLowerCase().includes('form'));
      
      // Create a structured object from the plain text
      data = {
        name: isContactRelated ? "Contact Form Notification" : "System Notification",
        email: "system@portfolio.local",
        message: msg.payload || "No message content",
        subject: isContactRelated ? "New Contact Form Activity" : "System Notification"
      };
      
      console.log('Created data structure from plain text:', data);
    }
    
    // Sanitize and validate the data before using it
    const sanitizedData = {
      name: (data.name || 'Unknown').trim().substring(0, 100),
      email: (data.email || 'unknown@example.com').trim().substring(0, 100),
      message: (data.message || msg.payload || 'No message content').trim().substring(0, 5000),
      subject: (data.subject || 'Contact Form Submission').trim().substring(0, 200)
    };
    
    // Create a visually appealing HTML email template with modern design
    const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td style="padding: 20px 0;">
          <table align="center" role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
            <!-- Header -->
            <tr>
              <td style="background: linear-gradient(to right, #3b82f6, #8b5cf6); padding: 30px; text-align: center;">
                <h2 style="margin: 0; color: white; font-weight: 600; font-size: 24px;">New Contact Form Submission</h2>
                <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">
                  ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </td>
            </tr>
            
            <!-- Content -->
            <tr>
              <td style="padding: 30px;">
                <!-- Name Field -->
                <div style="margin-bottom: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 6px; border-left: 4px solid #3b82f6;">
                  <p style="margin: 0 0 5px; font-weight: 600; color: #4b5563; font-size: 14px;">NAME</p>
                  <p style="margin: 0; color: #111827; font-size: 16px;">${sanitizedData.name}</p>
                </div>
                
                <!-- Email Field -->
                <div style="margin-bottom: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 6px; border-left: 4px solid #8b5cf6;">
                  <p style="margin: 0 0 5px; font-weight: 600; color: #4b5563; font-size: 14px;">EMAIL</p>
                  <p style="margin: 0; color: #111827; font-size: 16px;">
                    <a href="mailto:${sanitizedData.email}" style="color: #6366f1; text-decoration: none;">${sanitizedData.email}</a>
                  </p>
                </div>
                
                <!-- Subject Field (if available) -->
                ${sanitizedData.subject ? `
                <div style="margin-bottom: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 6px; border-left: 4px solid #10b981;">
                  <p style="margin: 0 0 5px; font-weight: 600; color: #4b5563; font-size: 14px;">SUBJECT</p>
                  <p style="margin: 0; color: #111827; font-size: 16px;">${sanitizedData.subject}</p>
                </div>
                ` : ''}
                
                <!-- Message Field -->
                <div style="margin-bottom: 20px; padding: 20px; background-color: #f8f9fa; border-radius: 6px; border-left: 4px solid #ec4899;">
                  <p style="margin: 0 0 10px; font-weight: 600; color: #4b5563; font-size: 14px;">MESSAGE</p>
                  <div style="margin: 0; color: #374151; font-size: 16px; line-height: 1.6;">
                    ${sanitizedData.message.replace(/\n/g, '<br>')}
                  </div>
                </div>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="background-color: #f3f4f6; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; color: #6b7280; font-size: 14px;">
                  This message was sent from your portfolio contact form.
                </p>
              </td>
            </tr>
            
            <!-- Branding -->
            <tr>
              <td style="background-color: #f9fafb; padding: 20px; text-align: center;">
                <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                  © ${new Date().getFullYear()} Abhishek Thormothe • <a href="https://abhicodes.com" style="color: #6366f1; text-decoration: none;">abhicodes.com</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
    
    // Email options - make sure to use your actual email here
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFICATION_EMAIL || 'abhishekmt2004@gmail.com', // Your personal email
      replyTo: sanitizedData.email, // Enable direct reply to the sender
      subject: `Portfolio Contact: ${sanitizedData.name}${sanitizedData.subject ? ` - ${sanitizedData.subject}` : ''}`,
      html: htmlContent,
      text: `New contact from ${sanitizedData.name} (${sanitizedData.email})\n\nMessage: ${sanitizedData.message}\n\nSent on: ${new Date().toLocaleString()}` // Plain text fallback
    };
    
    // Send email with better error handling
    const info = await transporter.sendMail(mailOptions);
    console.log('Email notification sent:', info.messageId);
    
    // Optionally, you could log this to a database table too
    
  } catch (error) {
    console.error('Error processing notification:', error);
    
    // Send yourself an error notification in case of failures
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.NOTIFICATION_EMAIL || 'abhishekmt2004@gmail.com',
        subject: 'ERROR: Contact Form Notification Failed',
        text: `There was an error processing a contact form submission:\n\n${error.message}\n\n${error.stack}`
      });
    } catch (emailError) {
      console.error('Failed to send error notification email:', emailError);
    }
  }
}

// Handle client connection errors
client.on('error', (err) => {
  console.error('Database client error:', err);
  
  // Try to reconnect
  client.end().catch(console.error);
  setTimeout(connectDB, 5000);
});

// Start the connection
connectDB();

// For graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down notification service...');
  try {
    await client.end();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});

// Export the client
export default client;

// Function to fetch contact messages directly from Supabase for testing
async function fetchMessages() {
  try {
    const response = await fetch('https://pnuedqkjteseqiimkkbl.supabase.co/rest/v1/contact_messages?select=name,email,message,subject,created_at&order=created_at.desc&limit=5', {
      headers: {
        'apikey': process.env.VITE_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${process.env.VITE_SUPABASE_ANON_KEY}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const messages = await response.json();
    console.log('Recent messages:', messages);
    
    // Optionally, you could process these to send test emails
    if (messages.length > 0) {
      console.log('Would process latest message:', messages[0]);
      // Uncomment to actually process the latest message
      // await handleNotificationFromData(messages[0]);
    }
    
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
}

// Helper function to simulate a notification from direct data
async function handleNotificationFromData(data) {
  // Create a payload similar to what pg_notify would send
  const payload = JSON.stringify(data);
  
  // Create a mock notification object
  const mockNotification = {
    channel: 'new_contact_message',
    payload: payload
  };
  
  // Process it with your existing handler
  await handleNotification(mockNotification);
}

// Call this for testing purposes
// fetchMessages();

// Add this near the end of your file
async function testSubjectColumn() {
  try {
    // Test query to check if subject column exists
    const query = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'contact_messages' 
      AND column_name = 'subject';
    `;
    
    const result = await client.query(query);
    
    if (result.rows.length > 0) {
      console.log('✅ Subject column confirmed in contact_messages table');
    } else {
      console.warn('⚠️ Subject column not found in contact_messages table');
    }
  } catch (error) {
    console.error('Error checking subject column:', error);
  }
}