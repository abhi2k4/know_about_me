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

// Connect to database with better error recovery and connection state tracking
let isConnecting = false;
let isConnected = false;

// Modify the client creation and connection logic
const createNewClient = () => {
  return new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });
};

const connectDB = async () => {
  // Don't try to connect if already connecting or connected
  if (isConnecting || isConnected) {
    console.log('Connection already in progress or established');
    return;
  }
  
  isConnecting = true;
  
  try {
    // Create a new client instance if needed
    if (!client) {
      client = createNewClient();
    }

    // Connect to the database
    await client.connect();
    console.log('Connected to PostgreSQL database');
    isConnected = true;
    
    // Set up notification listener
    await client.query('LISTEN new_contact_message');
    console.log('Listening for new contact messages');
    
    // Set up the notification handler
    client.on('notification', handleNotification);
    
  } catch (error) {
    console.error('Database connection error:', error);
    
    // Reset connection state
    isConnected = false;
    
    // Handle specific errors
    if (error.message.includes('already been connected')) {
      console.log('Client was already connected, creating new client...');
      
      try {
        // Clean up old client
        await client.end();
      } catch (endError) {
        console.log('Error ending old client:', endError.message);
      }
      
      // Create fresh client instance
      client = createNewClient();
      
      // Try connecting with the new client after a short delay
      setTimeout(connectDB, 1000);
    } else {
      // For other errors, retry after a longer delay
      console.log('Retrying connection in 10 seconds...');
      setTimeout(connectDB, 10000);
    }
  } finally {
    isConnecting = false;
  }
};

// Update the error handler to create a new client when needed
client.on('error', async (err) => {
  console.error('Database client error:', err);
  
  // Mark as disconnected
  isConnected = false;
  
  try {
    // Clean up the errored client
    await client.end();
  } catch (endError) {
    console.error('Error ending client:', endError);
  }
  
  // Create a new client instance
  client = createNewClient();
  
  // Attempt to reconnect
  setTimeout(connectDB, 5000);
});

// Add a heartbeat to check the connection periodically
const checkConnection = async () => {
  if (isConnected) {
    try {
      await client.query('SELECT 1');
      // Connection is still good
    } catch (error) {
      console.error('Heartbeat check failed:', error);
      isConnected = false;
      setTimeout(connectDB, 1000);
    }
  } else if (!isConnecting) {
    // If not connected and not in the process of connecting, try to connect
    connectDB();
  }
};

// Check connection every 30 seconds
setInterval(checkConnection, 30000);

// Start the connection
connectDB();

// Keep your existing handleNotification function and other code below...
async function handleNotification(msg) {
  try {
    console.log('Received notification:', msg.channel);
    console.log('Raw payload:', msg.payload);
    
    let data;
    try {
      // Try to parse the payload as JSON
      data = JSON.parse(msg.payload);
      console.log('Successfully parsed notification data:', data);
    } catch (jsonError) {
      console.warn('Failed to parse payload as JSON:', jsonError.message);
      // If not JSON, use the raw payload as the message
      data = {
        name: 'Unknown',
        email: 'unknown@example.com',
        message: msg.payload,
        subject: 'New Contact Form Submission'
      };
    }

    // Create email content
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFICATION_EMAIL,
      replyTo: data.email,
      subject: `Portfolio Contact: ${data.name}`,
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
                <p style="margin: 5px 0 0;">${new Date().toLocaleString()}</p>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">Name:</span>
                  ${data.name}
                </div>
                <div class="field">
                  <span class="label">Email:</span>
                  <a href="mailto:${data.email}">${data.email}</a>
                </div>
                ${data.subject ? `
                <div class="field">
                  <span class="label">Subject:</span>
                  ${data.subject}
                </div>
                ` : ''}
                <div class="field">
                  <span class="label">Message:</span>
                  ${data.message.replace(/\n/g, '<br>')}
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
${data.subject ? `Subject: ${data.subject}\n` : ''}
Message:
${data.message}

Sent on: ${new Date().toLocaleString()}
      `
    };

    // Send the email
    console.log('Attempting to send email notification...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

  } catch (error) {
    console.error('Error handling notification:', error);
    // Try to send an error notification
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.NOTIFICATION_EMAIL,
        subject: 'ERROR: Contact Form Notification Failed',
        text: `Error processing contact form submission:\n\n${error.stack}`
      });
    } catch (emailError) {
      console.error('Failed to send error notification:', emailError);
    }
  }
}