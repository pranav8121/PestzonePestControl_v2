# Pestzone Pest Control - Setup Instructions

## Quick Setup Guide

Follow these steps to get your pest control website running:

### Step 1: Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup email configuration:**
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file with your Gmail credentials:
   ```
   EMAIL_USER=santoshkadam1916@gmail.com
   EMAIL_PASS=your-gmail-app-password
   PORT=3000
   ```

4. **Gmail App Password Setup:**
   - Go to your Google Account settings
   - Enable 2-Step Verification
   - Generate an App Password for "Mail"
   - Use this app password in the `.env` file

5. **Start the backend server:**
   ```bash
   npm run dev
   ```
   
   ✅ Backend will run on: http://localhost:3000

### Step 2: Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Angular CLI (if not installed):**
   ```bash
   npm install -g @angular/cli
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the frontend server:**
   ```bash
   ng serve
   ```
   
   ✅ Frontend will run on: http://localhost:4200

### Step 3: Test the Website

1. Open http://localhost:4200 in your browser
2. Test the call buttons (should open phone dialer on mobile)
3. Fill out the contact form and submit
4. Check the email specified in backend/.env for the enquiry

## Troubleshooting

### Email not working?
- Make sure you're using an App Password, not your regular Gmail password
- Check that 2-Step Verification is enabled on your Gmail account
- Verify the EMAIL_USER and EMAIL_PASS in your .env file

### Frontend not loading?
- Make sure Angular CLI is installed: `npm install -g @angular/cli`
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

### Backend API errors?
- Check if backend server is running on port 3000
- Verify CORS is properly configured
- Check backend terminal for error messages

## Production Deployment

### Backend (Node.js)
- Deploy to Heroku, DigitalOcean, or AWS
- Set environment variables on your hosting platform
- Update API URL in frontend component

### Frontend (Angular)
- Build: `ng build --configuration production`
- Deploy the `dist/` folder to your web hosting service
- Configure web server for Single Page Application

## Need Help?

Contact Pestzone Pest Control:
- 📞 +91-9819833383 / +91-8108489177
- 📧 santoshkadam1916@gmail.com

---

**Your professional pest control website is ready to go! 🐛🚫**