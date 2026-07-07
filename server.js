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
