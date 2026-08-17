import express from 'express';
import Contact from '../models/Contact.js';
import { sendAdminNotification } from '../services/emailService.js';

const router = express.Router();

// POST: Submit contact form (public)
// Endpoint: POST /api/contact/submit
router.post('/submit', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message',
      });
    }

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();

    // Send email notification to admin
    const emailSent = await sendAdminNotification(newContact);

    if (emailSent) {
      newContact.notificationSent = true;
      await newContact.save();
    }

    res.status(201).json({
      success: true,
      message:
        'Message sent successfully! Thank you for reaching out.',
      data: {
        id: newContact._id,
        email: newContact.email,
      },
    });
  } catch (error) {
    console.error('Contact submission error:', error);

    res.status(500).json({
      success: false,
      message:
        'Failed to submit message. Please try again later.',
      error:
        process.env.NODE_ENV === 'development'
          ? error.message
          : undefined,
    });
  }
});

export default router;
