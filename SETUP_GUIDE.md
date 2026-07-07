# MongoDB + Express Backend Setup Guide

## Your Configuration ✅
- **Backend**: Node.js + Express
- **Database**: MongoDB (Local)
- **Frontend**: React + Vite
- **Deployment**: Heroku
- **Features**: Email notifications + Admin Dashboard

## Prerequisites
- Node.js v16+
- MongoDB Community (local installation)
- npm or yarn
- GitHub & Heroku account

## Step 1: Install MongoDB Locally

### Windows
1. Download MongoDB Community: https://www.mongodb.com/try/download/community
2. Run installer (use all defaults)
3. MongoDB starts automatically

### macOS
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux (Ubuntu/Debian)
```bash
curl https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

**Verify installation:**
```bash
mongosh
# Should show MongoDB shell
> exit()
```

## Step 2: Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Create Environment File
```bash
cp .env.example .env
```

### 3. Configure .env
```ini
# MongoDB Connection (local)
MONGODB_URI=mongodb://localhost:27017/portfolio

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Email Notifications (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx-xxxx-xxxx-xxxx
EMAIL_TO=your-email@gmail.com

# Admin Dashboard
ADMIN_USERNAME=admin
ADMIN_PASSWORD=SecurePassword123
```

### 4. Set Up Gmail Email Notifications
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer" (or your device)
3. Get 16-character password
4. Paste into `EMAIL_PASSWORD` in .env

### 5. Start Backend
```bash
npm run dev
```

**Expected Output:**
```
✅ MongoDB connected successfully
📧 Email notifications: ✅ Enabled
🚀 Server running on http://localhost:5000
```

## Step 3: Frontend Setup

```bash
# From project root
npm install
npm run dev
```

Frontend runs at: http://localhost:5173

## Step 4: Test Everything

1. **Form Submission Test**
   - Navigate to Contact section on http://localhost:5173
   - Fill form with Name, Email, Message
   - Click "Send Message"
   - Should see success message

2. **Email Notification Test**
   - Check your email inbox
   - You should receive notification with message details

3. **Database Test**
   ```bash
   mongosh
   > use portfolio
   > db.contacts.find()
   ```

## API Endpoints

### Contact Submission
```
POST /api/contact/submit
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here"
}
```

### Admin Endpoints (Basic Auth)
```
GET /api/admin/stats
GET /api/admin/messages
GET /api/admin/messages/:id
POST /api/admin/messages/:id/reply
DELETE /api/admin/messages/:id

Authorization: Basic base64(admin:password)
```

## Database Schema

### contacts collection
```javascript
{
  _id: ObjectId,
  name: String,           // Required
  email: String,          // Required
  message: String,        // Required (10-5000 chars)
  status: String,         // "new" | "read" | "replied"
  notificationSent: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Development Commands

```bash
# Backend
cd backend
npm run dev        # Start with auto-reload
npm start          # Start production

# Frontend
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview build
```

## Deploying to Heroku

### Backend
```bash
cd backend
heroku login
heroku create portfolio-api-yourusername
heroku addons:create mongolab:sandbox
```

Configure environment variables:
```bash
heroku config:set EMAIL_USER=your@gmail.com
heroku config:set EMAIL_PASSWORD=xxxx-xxxx-xxxx-xxxx
heroku config:set EMAIL_TO=your@gmail.com
heroku config:set ADMIN_USERNAME=admin
heroku config:set ADMIN_PASSWORD=SecurePassword123
```

Deploy:
```bash
git push heroku main
heroku logs --tail
```

### Frontend
```bash
heroku create portfolio-yourusername
# Update VITE_API_URL to Heroku backend URL
# git push heroku main
```

## Troubleshooting

### MongoDB Connection Error
```
❌ MongoDB connection error: connect ECONNREFUSED
```
**Solution:**
- Start MongoDB: `brew services start mongodb-community` (Mac)
- Or check Windows services for MongoDB
- Verify MONGODB_URI is correct in .env

### Email Not Sending
```
Error: Invalid login - application-specific password required
```
**Solution:**
- Ensure you're using Gmail app password (not regular password)
- Generate new app password from link above
- Restart backend after updating .env

### CORS Error in Browser
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Verify FRONTEND_URL in backend .env
- Restart backend after changes
- Check browser console for exact error

### Form Not Submitting
```
Failed to fetch: TypeError
```
**Solution:**
- Check backend is running: `curl http://localhost:5000/api/health`
- Verify VITE_API_URL in frontend .env
- Check browser network tab for exact error

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
```bash
# Find process on port 5000
lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Kill process
kill -9 <PID>  # Mac/Linux
taskkill /PID <PID> /F  # Windows

# Or change PORT in .env
```

## Security Best Practices

- **Never commit .env** - Add to .gitignore ✅
- **Use strong passwords** for ADMIN_PASSWORD
- **Keep EMAIL_PASSWORD secret** - Don't share
- **Use HTTPS** in production (Heroku does this)
- **Add rate limiting** for production
- **Use JWT** for admin authentication (future enhancement)

## File Structure

```
portfolio/
├── src/
│   └── components/
│       └── Contact.tsx         # Contact form
├── backend/
│   ├── server.js               # Express app
│   ├── package.json
│   ├── .env                    # (create this)
│   ├── .env.example
│   ├── Procfile                # Heroku config
│   ├── models/
│   │   └── Contact.js          # MongoDB schema
│   ├── routes/
│   │   ├── contact.js          # Form endpoints
│   │   └── admin.js            # Admin endpoints
│   └── services/
│       └── emailService.js     # Email handler
├── .env.local                  # Frontend config
├── .env.example                # Frontend template
├── QUICK_START.md              # Quick setup
└── SETUP_GUIDE.md             # This file
```

## Next Steps

1. ✅ Local development working?
2. Test email notifications
3. Deploy backend to Heroku
4. Deploy frontend to Vercel/Netlify
5. Connect production URLs
6. Add admin dashboard UI
7. Set up automated backups

## Support

- Check console errors with `npm run dev`
- Read backend logs: `heroku logs --tail`
- Test API endpoints with Postman/Insomnia
- Review MongoDB data with `mongosh`

