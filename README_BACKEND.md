# Portfolio + Backend Setup

## ⚡ Quick Start (10 minutes)

1. **Install MongoDB** (local):
   - Download: https://www.mongodb.com/try/download/community
   - Install and verify: `mongosh`

2. **Start Backend**:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm run dev
   ```

3. **Start Frontend**:
   ```bash
   npm install
   npm run dev
   ```

✅ Done! Visit http://localhost:5173 and test the contact form.

---

## 📋 Your Setup

Based on your preferences, we've built:

| Aspect | Your Choice | Status |
|--------|-------------|--------|
| Form Fields | Basic (Name, Email, Message) | ✅ Ready |
| Backend | Node.js + Express | ✅ Ready |
| Database | MongoDB (Local) | ✅ Ready |
| Features | Email Notifications + Admin Dashboard | ✅ Ready |
| Deployment | Heroku | ✅ Ready |

## 📁 What's New

### Backend Folder (`/backend`)
- **server.js** - Express server
- **models/Contact.js** - MongoDB schema
- **routes/contact.js** - Form submission endpoint
- **routes/admin.js** - Admin dashboard endpoints
- **services/emailService.js** - Email notifications
- **package.json** - Dependencies
- **Procfile** - Heroku configuration

### Frontend Changes (`/src`)
- **components/Contact.tsx** - Updated form
  - Simplified to basic fields
  - Connects to backend API
  - Error handling
  - Loading states
  - Email notifications

### Configuration
- **.env.local** - Frontend config
- **backend/.env.example** - Backend template
- **.gitignore** - Keeps secrets safe

### Documentation
- **QUICK_START.md** - 5-minute setup
- **SETUP_GUIDE.md** - Detailed guide with troubleshooting
- **PREFERENCES.md** - Your custom configuration
- **backend/README.md** - Backend documentation

---

## 🎯 What Happens When Someone Submits the Form

1. **Frontend**: User fills Name, Email, Message
2. **Validation**: Frontend validates input
3. **Submission**: Sends to `http://localhost:5000/api/contact/submit`
4. **Backend**: Validates and saves to MongoDB
5. **Email**: Admin gets email notification with message
6. **Response**: User sees success message
7. **Database**: Check anytime with `mongosh` and `db.contacts.find()`

---

## 🚀 Deployment to Heroku (When Ready)

### Backend
```bash
cd backend
heroku login
heroku create portfolio-api-yourusername
heroku addons:create mongolab:sandbox
heroku config:set EMAIL_USER=your@gmail.com
heroku config:set EMAIL_PASSWORD=xxxx-xxxx-xxxx-xxxx
git push heroku main
```

### Frontend
```bash
heroku create portfolio-yourusername
# Update VITE_API_URL to your Heroku backend
git push heroku main
```

---

## 📚 Documentation Files

Start here based on your need:

- **Just want to start?** → [QUICK_START.md](./QUICK_START.md)
- **Want detailed setup?** → [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **Want to understand your config?** → [PREFERENCES.md](./PREFERENCES.md)
- **Backend developer?** → [backend/README.md](./backend/README.md)

---

## 🔑 Key Features

### Contact Form
- Name, Email, Message fields
- Input validation
- Error handling
- Loading states
- Success confirmation

### Email Notifications 📧
- Admin gets email when form submitted
- Includes message preview
- Shows timestamp
- Tracking of sent notifications

### Admin Endpoints 🔐
- View all messages
- Filter by status
- Send replies
- Mark as read/replied
- Delete messages
- Get statistics

### Database 💾
- MongoDB (local or cloud-ready)
- Clean schema
- Proper indexes
- Timestamps on all records

---

## ⚙️ Environment Variables

### Backend (.env)
```ini
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=app-specific-password
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure-password
```

### Frontend (.env.local)
```ini
VITE_API_URL=http://localhost:5000
```

---

## 🧪 Testing

### Test Contact Form
1. http://localhost:5173 → Contact section
2. Fill form and submit
3. Check email for notification
4. See in database: `mongosh` → `db.contacts.find()`

### Test API
```bash
# Health check
curl http://localhost:5000/api/health

# Submit form
curl -X POST http://localhost:5000/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@example.com", 
    "message": "Test message content here"
  }'
```

### Check Database
```bash
mongosh
> use portfolio
> db.contacts.find()  # See all messages
> db.contacts.count() # Count messages
> db.contacts.deleteMany({}) # Clear all (dev only)
```

---

## 🐛 Troubleshooting

### MongoDB Won't Connect
```bash
# Start MongoDB
mongosh  # Should show shell
```

### Email Not Sending
- Go to https://myaccount.google.com/apppasswords
- Generate Gmail app password (16 chars)
- Add to EMAIL_PASSWORD in .env
- Restart backend

### Form Not Submitting
- Check backend: `http://localhost:5000/api/health`
- Check browser console (F12)
- Verify VITE_API_URL in .env.local

### Port Already in Use
```bash
# Find what's using port 5000
lsof -i :5000         # Mac/Linux
netstat -ano | findstr :5000  # Windows
```

See SETUP_GUIDE.md for more troubleshooting.

---

## 🛡️ Security

✅ **Already Done**
- Environment variables for secrets
- Input validation
- Error handling without exposing internals
- CORS configured
- .gitignore set up

⚠️ **For Production**
- Use JWT for admin auth
- Enable rate limiting
- Use HTTPS (Heroku does this)
- Add stronger password requirements
- Monitor for abuse

---

## 📞 Support

**For setup issues**: Check SETUP_GUIDE.md troubleshooting section

**For API questions**: See backend/README.md

**For configuration**: See PREFERENCES.md

**For quick reference**: See QUICK_START.md

---

## 🎉 You're All Set!

Your portfolio now has:
- ✅ Working contact form
- ✅ MongoDB database
- ✅ Email notifications
- ✅ Admin endpoints
- ✅ Heroku-ready deployment
- ✅ Complete documentation

**Next step**: Follow [QUICK_START.md](./QUICK_START.md) for 10-minute setup!

---

**Folder Structure**:
```
portfolio/
├── src/                    # React frontend
│   └── components/
│       └── Contact.tsx     # Updated form
├── backend/                # Express backend
│   ├── server.js
│   ├── routes/
│   ├── models/
│   ├── services/
│   └── package.json
├── .env.local              # Frontend config
├── QUICK_START.md          # Start here!
├── SETUP_GUIDE.md          # Detailed guide
├── PREFERENCES.md          # Your config
└── README.md               # This file
```

Enjoy your new portfolio with backend capabilities! 🚀
