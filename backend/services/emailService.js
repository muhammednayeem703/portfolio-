import nodemailer from 'nodemailer';

let transporter;

// Initialize email transporter
export const initEmailService = () => {
  transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Send notification email to admin
export const sendAdminNotification = async (contact) => {
  if (!process.env.EMAIL_USER) {
    console.warn('Email service not configured. Skipping notification.');
    return false;
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `📨 New Contact Form Submission from ${contact.name}`,
      html: `
        <h2>New Message from Your Portfolio!</h2>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Message:</strong></p>
        <p>${contact.message.replace(/\n/g, '<br>')}</p>
        <p><strong>Submitted:</strong> ${new Date(contact.createdAt).toLocaleString()}</p>
        <hr>
        <p><a href="${process.env.FRONTEND_URL}/admin">View in Admin Dashboard</a></p>
      `
    });
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Send reply confirmation email to user
export const sendUserReply = async (contact, replyMessage) => {
  if (!process.env.EMAIL_USER) {
    console.warn('Email service not configured. Skipping notification.');
    return false;
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: contact.email,
      subject: 'Re: Your Message',
      html: `
        <p>Hi ${contact.name},</p>
        <p>Thank you for reaching out! Here's my reply:</p>
        <p>${replyMessage.replace(/\n/g, '<br>')}</p>
        <br>
        <p>Best regards,<br>Your Portfolio</p>
      `
    });
    return true;
  } catch (error) {
    console.error('Error sending reply email:', error);
    return false;
  }
};
