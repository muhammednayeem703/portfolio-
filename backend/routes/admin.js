import express from 'express';
import Contact from '../models/Contact.js';
import { sendUserReply } from '../services/emailService.js';

const router = express.Router();

// Simple auth middleware - in production, use JWT or similar
const adminAuth = (req, res, next) => {
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'admin';
  
  const auth = req.headers.authorization?.split(' ')[1];
  if (!auth) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const [user, pass] = Buffer.from(auth, 'base64').toString().split(':');
  if (user === username && pass === password) {
    next();
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
};

// GET: Dashboard stats
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const total = await Contact.countDocuments();
    const newCount = await Contact.countDocuments({ status: 'new' });
    const readCount = await Contact.countDocuments({ status: 'read' });
    const repliedCount = await Contact.countDocuments({ status: 'replied' });

    res.json({
      success: true,
      data: {
        total,
        new: newCount,
        read: readCount,
        replied: repliedCount
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch stats' });
  }
});

// GET: All contacts for admin
router.get('/messages', adminAuth, async (req, res) => {
  try {
    const { status, sort = 'newest' } = req.query;
    let query = {};
    let sortOption = { createdAt: -1 };

    if (status) {
      query.status = status;
    }

    if (sort === 'oldest') {
      sortOption = { createdAt: 1 };
    }

    const contacts = await Contact.find(query).sort(sortOption);
    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch messages' });
  }
});

// GET: Single message
router.get('/messages/:id', adminAuth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: 'read' },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch message' });
  }
});

// POST: Send reply to contact
router.post('/messages/:id/reply', adminAuth, async (req, res) => {
  try {
    const { reply } = req.body;

    if (!reply || reply.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Reply cannot be empty' });
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    // Send reply email
    const emailSent = await sendUserReply(contact, reply);

    // Update status to replied
    contact.status = 'replied';
    await contact.save();

    res.json({
      success: true,
      message: emailSent ? 'Reply sent successfully' : 'Reply marked but email failed',
      data: contact
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send reply' });
  }
});

// DELETE: Delete message
router.delete('/messages/:id', adminAuth, async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);

    if (!deletedContact) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete message' });
  }
});

export default router;
