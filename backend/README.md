# Portfolio Backend

## Setup Summary ✅

Based on your preferences:
- **Framework**: Node.js + Express
- **Database**: MongoDB (Local)
- **Features**: Email notifications + Admin dashboard
- **Deployment**: Heroku
- **Form Fields**: Name, Email, Message

## Quick Start

```bash
# 1. Install MongoDB (local)
# Windows/Mac/Linux - follow SETUP_GUIDE.md

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your email credentials

# 4. Start server
npm run dev
```

## Environment Variables

```ini
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx-xxxx-xxxx-xxxx
EMAIL_TO=your-email@gmail.com
ADMIN_USERNAME=admin
ADMIN_PASSWORD=SecurePassword123
```

## API Endpoints

### Public Endpoints
- `POST /api/contact/submit` - Submit contact form

### Admin Endpoints (Basic Auth)
- `GET /api/admin/stats` - Get message statistics
- `GET /api/admin/messages` - Get all messages
- `GET /api/admin/messages/:id` - Get single message
- `POST /api/admin/messages/:id/reply` - Send reply email
- `DELETE /api/admin/messages/:id` - Delete message

## Database Schema

```javascript
Contact {
  _id: ObjectId,
  name: String (required),
  email: String (required),
  message: String (required, 10-5000 chars),
  status: "new" | "read" | "replied",
  notificationSent: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Features

### Email Notifications 📧
- Admin notified on new contact form submission
- Includes message preview and timestamp
- Supports Gmail with app passwords

### Admin Dashboard
- View all messages sorted by date
- Filter by status (new/read/replied)
- Mark messages as read/replied
- Send automated replies
- Delete messages

### Validation
- Name: 2-100 characters
- Email: Valid email format
- Message: 10-5000 characters
- Input sanitization on all fields

## File Structure

```
backend/
├── server.js              # Express app setup
├── package.json
├── .env.example
├── Procfile               # Heroku config
├── models/
│   └── Contact.js         # Mongoose schema
├── routes/
│   ├── contact.js         # Form endpoints
│   └── admin.js           # Admin endpoints
└── services/
    └── emailService.js    # Email handler
```

## Development

```bash
npm run dev      # Start with auto-reload
npm start        # Start production
```

## Deployment (Heroku)

```bash
heroku login
heroku create portfolio-api-yourusername
heroku addons:create mongolab:sandbox
heroku config:set EMAIL_USER=your@gmail.com
heroku config:set EMAIL_PASSWORD=xxxx-xxxx-xxxx-xxxx
git push heroku main
```

## Security

- Keep `.env` secret - never commit to Git
- Use strong ADMIN_PASSWORD
- Gmail requires app-specific password (not regular password)
- Enable rate limiting before production
- Implement JWT for better security
- Validate all inputs (frontend + backend)

## Troubleshooting

**Can't connect to MongoDB:**
```bash
mongosh  # Verify MongoDB is running
```

**Email not sending:**
- Verify Gmail app password (not regular password)
- Check .env has correct EMAIL_USER and EMAIL_PASSWORD

**CORS error:**
- Restart backend after changing .env
- Verify FRONTEND_URL is correct

See SETUP_GUIDE.md for more troubleshooting.

