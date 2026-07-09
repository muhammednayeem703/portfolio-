import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, 'data');
const fallbackFile = path.join(dataDir, 'contact-submissions.json');
const adminUsername = process.env.ADMIN_USERNAME || 'admin';
const adminPassword = process.env.ADMIN_PASSWORD || 'admin';

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));

const supabase =
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })
    : null;

const sanitizeString = (value) => (typeof value === 'string' ? value.trim() : '');
const normalizeEmail = (value) => sanitizeString(value).toLowerCase();

const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .set('WWW-Authenticate', 'Basic realm="Admin Dashboard"')
      .json({ success: false, message: 'Unauthorized' });
  }

  const [scheme, encodedCredentials] = authHeader.split(' ');

  if (scheme !== 'Basic' || !encodedCredentials) {
    return res
      .status(401)
      .set('WWW-Authenticate', 'Basic realm="Admin Dashboard"')
      .json({ success: false, message: 'Unauthorized' });
  }

  const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf8');
  const [username, password] = decodedCredentials.split(':');

  if (username === adminUsername && password === adminPassword) {
    return next();
  }

  return res
    .status(401)
    .set('WWW-Authenticate', 'Basic realm="Admin Dashboard"')
    .json({ success: false, message: 'Invalid admin credentials' });
};

const readStoredMessages = async () => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) {
        return Array.isArray(data) ? data : [];
      }
    } catch (dbError) {
      console.error('Unable to read from Supabase, falling back to local file:', dbError);
    }
  }

  try {
    const raw = await fs.readFile(fallbackFile, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const validatePayload = (body) => {
  const errors = [];
  const name = sanitizeString(body?.name);
  const email = normalizeEmail(body?.email);
  const message = sanitizeString(body?.message);

  if (!name) {
    errors.push('Name is required.');
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('A valid email is required.');
  }

  if (!message) {
    errors.push('Message is required.');
  }

  return {
    isValid: errors.length === 0,
    errors,
    data: {
      name,
      email,
      message,
    },
  };
};

const saveToFallbackFile = async (submission) => {
  await fs.mkdir(dataDir, { recursive: true });

  let existing = [];
  try {
    const raw = await fs.readFile(fallbackFile, 'utf8');
    existing = JSON.parse(raw);
  } catch {
    existing = [];
  }

  existing.push(submission);
  await fs.writeFile(fallbackFile, JSON.stringify(existing, null, 2));
  return submission;
};

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Portfolio contact API is running.',
  });
});

app.get('/admin', adminAuth, async (_req, res) => {
  const messages = await readStoredMessages();
  const total = messages.length;
  const newCount = messages.filter((message) => message.status === 'new').length;
  const readCount = messages.filter((message) => message.status === 'read').length;
  const repliedCount = messages.filter((message) => message.status === 'replied').length;

  const rows = messages
    .map((item) => {
      const createdAt = item.created_at || item.createdAt || 'Unknown';
      const status = item.status || 'new';
      const safeMessage = (item.message || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `
        <tr>
          <td>${item.name || 'Unknown'}</td>
          <td>${item.email || 'Unknown'}</td>
          <td>${safeMessage}</td>
          <td>${status}</td>
          <td>${createdAt}</td>
        </tr>`;
    })
    .join('');

  res.type('html').send(`<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Portfolio Admin Dashboard</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 24px; background: #111827; color: #f9fafb; }
          .card { background: #1f2937; border: 1px solid #374151; border-radius: 12px; padding: 16px; margin-bottom: 16px; }
          .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; }
          .stat { background: #111827; padding: 12px; border-radius: 8px; }
          table { width: 100%; border-collapse: collapse; margin-top: 12px; }
          th, td { border-bottom: 1px solid #374151; padding: 10px; text-align: left; }
          th { color: #9ca3af; }
        </style>
      </head>
      <body>
        <h1>Portfolio Admin Dashboard</h1>
        <p>Manage visitor contact submissions.</p>
        <div class="card">
          <div class="stats">
            <div class="stat"><strong>${total}</strong><br />Total</div>
            <div class="stat"><strong>${newCount}</strong><br />New</div>
            <div class="stat"><strong>${readCount}</strong><br />Read</div>
            <div class="stat"><strong>${repliedCount}</strong><br />Replied</div>
          </div>
        </div>
        <div class="card">
          <h2>Messages</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>${rows || '<tr><td colspan="5">No submissions yet.</td></tr>'}</tbody>
          </table>
        </div>
      </body>
    </html>`);
});

app.get('/api/admin/stats', adminAuth, async (_req, res) => {
  const messages = await readStoredMessages();
  res.json({
    success: true,
    data: {
      total: messages.length,
      new: messages.filter((message) => message.status === 'new').length,
      read: messages.filter((message) => message.status === 'read').length,
      replied: messages.filter((message) => message.status === 'replied').length,
    },
  });
});

app.get('/api/admin/messages', adminAuth, async (_req, res) => {
  const messages = await readStoredMessages();
  res.json({ success: true, data: messages });
});

app.post('/api/contact/submit', async (req, res) => {
  try {
    const validation = validatePayload(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact payload.',
        errors: validation.errors,
      });
    }

    const submission = {
      id: crypto.randomUUID(),
      name: validation.data.name,
      email: validation.data.email,
      message: validation.data.message,
      status: 'new',
      source: 'portfolio',
      created_at: new Date().toISOString(),
    };

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('contact_messages')
          .insert([submission])
          .select()
          .single();

        if (error) {
          throw error;
        }

        return res.status(201).json({
          success: true,
          message: 'Message stored successfully.',
          data,
        });
      } catch (dbError) {
        console.error('Supabase insert failed, falling back to local file storage:', dbError);
      }
    }

    const storedSubmission = await saveToFallbackFile(submission);

    return res.status(201).json({
      success: true,
      message: 'Message stored successfully using local backup storage.',
      data: storedSubmission,
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to store your message right now.',
    });
  }
});

app.listen(port, () => {
  console.log(`Contact API listening on http://localhost:${port}`);
});
