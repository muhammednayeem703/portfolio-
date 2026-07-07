import express from 'express';
import Contact from '../models/Contact.js';
import { sendAdminNotification, sendUserReply } from '../services/emailService.js';

const router = express.Router();

// POST: Submit a contact form
router.post('/submit', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message'
      });
    }

    // Create new contact document
    const newContact = new Contact({
      name,
      email,
      message
    });

    // Save to database
    await newContact.save();

    // Send email notification to admin
    const emailSent = await sendAdminNotification(newContact);
    if (emailSent) {
      newContact.notificationSent = true;
      await newContact.save();
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! Thank you for reaching out.',
      data: {
        id: newContact._id,
        email: newContact.email
      }
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET: Retrieve all contacts (admin only)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contacts'
    });
  }
});

// GET: Get a single contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contact'
    });
  }
});

// PUT: Update contact status (mark as read/replied)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be: new, read, or replied'
      });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Status updated successfully',
      data: updatedContact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update status'
    });
  }
});

// DELETE: Delete a contact
router.delete('/:id', async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);

    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact'
    });
  }
});

export default router;
