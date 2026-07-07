# Your Custom Setup Configuration

## Preferences Summary ✅

This backend was configured based on your specific preferences:

### 1. Form Fields
**Selected**: Basic Form (Name, Email, Message)
- Simplified contact form with essential fields only
- Clean and minimal user experience
- Easy to manage and store

**Fields Collected**:
- ✅ Name (required, 2-100 chars)
- ✅ Email (required, valid email format)
- ✅ Message (required, 10-5000 chars)
- ❌ Phone (not included)
- ❌ Subject (not included)

### 2. Backend Framework
**Selected**: Node.js + Express
- JavaScript/TypeScript backend
- Lightweight and fast
- Great package ecosystem
- Easy to deploy

**What You Get**:
- Express.js server
- MongoDB integration via Mongoose
- Email service with Nodemailer
- Admin dashboard endpoints
- CORS configured
- Error handling middleware

### 3. Database
**Selected**: MongoDB (Local Development)
- NoSQL, flexible schema
- Document-based storage
- Perfect for portfolios
- Running on your local machine (port 27017)

**Local Setup**:
```
mongodb://localhost:27017/portfolio
```
- No cloud account needed
- Data stored locally
- Full control

### 4. Database Hosting
**Selected**: Local Development Only
- MongoDB installed and running locally
- Perfect for development and testing
- Easy setup on Windows/Mac/Linux
- Can upgrade to MongoDB Atlas later

### 5. Additional Features
**Selected**: 
- ✅ Email Notifications
- ✅ Admin Dashboard

**Email Notifications**:
- Admin notified when someone submits form
- Uses Gmail + App Password
- Includes full message preview
- Tracking of sent notifications

**Admin Dashboard** (API endpoints ready):
- View all contact messages
- Filter by status (new/read/replied)
- Send replies to contacts
- Mark messages as read/replied
- Delete messages
- View statistics

### 6. Deployment Plan
**Selected**: Heroku + Heroku
- Both frontend and backend on Heroku
- Easy free tier available
- GitHub integration
- Automatic deployments

**Heroku Setup When Ready**:
```bash
# Backend
heroku create portfolio-api-yourusername
heroku addons:create mongolab:sandbox

# Frontend  
heroku create portfolio-yourusername
```

## What's Installed

### Backend (Node.js)
```
Dependencies:
- express (4.18.2) - Web framework
- mongoose (8.0.0) - MongoDB ODM
- cors (2.8.5) - Cross-origin requests
- dotenv (16.3.1) - Environment variables
- nodemailer (6.9.7) - Email service
- nodemon (3.0.1) - Auto-reload in dev
```

### Directory Structure
```
backend/
├── server.js                 # Main server
├── models/
│   └── Contact.js           # Message schema
├── routes/
│   ├── contact.js           # Form endpoints
│   └── admin.js             # Admin endpoints
├── services/
│   └── emailService.js      # Email handler
├── package.json
├── .env.example             # Config template
├── Procfile                 # Heroku config
└── README.md
```

### Frontend Changes
```
src/components/
└── Contact.tsx              # Updated form
  - Basic fields only
  - API integration
  - Error handling
  - Loading states
  - Success messages
```

## Configuration Files

### .env.example (Backend)
```ini
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx-xxxx-xxxx-xxxx
EMAIL_TO=your-email@gmail.com
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
```

### .env.local (Frontend)
```ini
VITE_API_URL=http://localhost:5000
```

## Next Steps (In Order)

### 1. Install MongoDB
- Follow instructions in SETUP_GUIDE.md
- Verify with `mongosh`

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your Gmail app password
npm run dev
```

### 3. Configure Email (Optional but Recommended)
1. Go to https://myaccount.google.com/apppasswords
2. Generate Gmail app password
3. Add to `EMAIL_PASSWORD` in .env

### 4. Test Locally
- Frontend: http://localhost:5173
- Backend: http://localhost:5000/api/health
- MongoDB: `mongosh`

### 5. Deploy to Heroku (When Ready)
- See SETUP_GUIDE.md "Deploying to Heroku" section
- Add MongoDB Atlas addon for production

## Available API Endpoints

### Public
```
POST /api/contact/submit
  Submit contact form

GET /api/health
  Server status check
```

### Admin (Basic Auth)
```
GET /api/admin/stats
  Message statistics

GET /api/admin/messages
  All messages with filtering

GET /api/admin/messages/:id
  Single message (marks as read)

POST /api/admin/messages/:id/reply
  Send reply to contact

DELETE /api/admin/messages/:id
  Delete message
```

## Security Features

✅ **Input Validation**
- Name length checks
- Email format validation
- Message length limits

✅ **Environment Protection**
- Sensitive data in .env
- .gitignore configured
- No secrets in code

✅ **CORS Configuration**
- Restricted to frontend URL
- Credentials enabled

✅ **Error Handling**
- Safe error messages
- No sensitive info exposed
- Proper HTTP status codes

⚠️ **Future Enhancements**
- Add JWT authentication
- Implement rate limiting
- Add HTTPS enforcement
- User authentication system

## Support Resources

📚 **Documentation**
- QUICK_START.md - Quick setup
- SETUP_GUIDE.md - Detailed guide
- backend/README.md - Backend docs

🐛 **Troubleshooting**
- Check logs: `npm run dev`
- Test API: http://localhost:5000/api/health
- Database: `mongosh` and `db.contacts.find()`

💡 **Tips**
- Keep .env files out of Git
- Use strong passwords
- Test email before deploying
- Monitor Heroku logs: `heroku logs --tail`

## Custom Modifications

You can easily customize this setup:

### Add More Fields
- Update Contact schema in `models/Contact.js`
- Add fields to form in `src/components/Contact.tsx`
- Update API validation

### Change Email Service
- Modify `emailService.js` to use SendGrid, Mailgun, etc.
- Update .env configuration

### Switch to Cloud MongoDB
- Change MONGODB_URI to MongoDB Atlas connection string
- No code changes needed

### Add Admin UI
- Create new React component for admin dashboard
- Call API endpoints from admin routes
- Add authentication

## Questions or Issues?

1. **Read the docs first**
   - SETUP_GUIDE.md has troubleshooting section
   - Check backend/README.md for API details

2. **Check the logs**
   - Frontend: Browser console (F12)
   - Backend: Terminal output
   - Database: `mongosh` commands

3. **Test the endpoints**
   - Use Postman or Insomnia
   - Check network tab in browser
   - Verify .env configuration

---

**Setup completed**: $(date)
**Configuration**: Local Development + Heroku Ready
**Next action**: Follow QUICK_START.md for 10-minute setup
