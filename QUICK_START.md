# 🚀 Quick Start - MongoDB Backend Setup

## Prerequisites
- Node.js (v16+)
- MongoDB Community Edition (local)
- Git & GitHub account

## 1️⃣ Install MongoDB Locally

### Windows
1. Download from https://www.mongodb.com/try/download/community
2. Run the installer
3. MongoDB should start automatically on port 27017

### Mac
```bash
brew install mongodb-community
brew services start mongodb-community
```

### Linux (Ubuntu)
```bash
curl https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

**Verify MongoDB is running:**
```bash
mongosh
# If you see a MongoDB shell, you're good!
```

## 2️⃣ Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env`:
```
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_TO=your-email@gmail.com
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
```

### Set Up Email Notifications
1. Go to https://myaccount.google.com/apppasswords
2. Generate an app password for Gmail
3. Copy the 16-character password to `.env` as `EMAIL_PASSWORD`

Start backend:
```bash
npm run dev
```

Expected output:
```
✅ MongoDB connected successfully
📧 Email notifications: ✅ Enabled
🚀 Server running on http://localhost:5000
```

## 3️⃣ Frontend Setup

```bash
# From root folder
npm install
npm run dev
```

Frontend at: http://localhost:5173

## 4️⃣ Test the Form

1. Open http://localhost:5173
2. Go to Contact section
3. Fill form and submit
4. Check your email for notification! 📧
5. Check MongoDB with:
   ```bash
   mongosh
   use portfolio
   db.contacts.find()
   ```

## 🎯 Admin Dashboard (Coming Soon)

Access messages at:
```
POST http://localhost:5000/api/admin/messages
Authorization: Basic base64(admin:password)
```

## 📦 Deploying to Heroku

### Backend Deployment
```bash
cd backend
heroku login
heroku create your-app-name-api
heroku addons:create mongolab:sandbox
git push heroku main
heroku config:set EMAIL_USER=your@gmail.com EMAIL_PASSWORD=xxxx
```

### Frontend Deployment
```bash
# At root folder
heroku create your-app-name
git push heroku main
```

## 🆘 Troubleshooting

**MongoDB connection error:**
- Ensure MongoDB is running: `mongosh`
- Check MONGODB_URI in .env

**Email not sending:**
- Verify EMAIL_USER and EMAIL_PASSWORD in .env
- Generate app password (link above)
- Check .env is copied from .env.example

**CORS Error:**
- Restart backend after changing .env
- Verify FRONTEND_URL is correct

**Form not submitting:**
- Check browser console for errors
- Verify backend is running (http://localhost:5000/api/health)
- Check VITE_API_URL in frontend .env

## 📚 What's Stored

Each message saves:
- Name
- Email
- Message
- Status (new/read/replied)
- Timestamp
- Notification sent (yes/no)

## 🔐 Security Notes

- Keep `.env` files secret
- Never commit to Git
- Use strong ADMIN_PASSWORD for production
- Change EMAIL_PASSWORD for sensitive data

Need more help? See [SETUP_GUIDE.md](./SETUP_GUIDE.md)

