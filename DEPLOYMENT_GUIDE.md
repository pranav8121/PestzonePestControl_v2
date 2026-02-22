# PEST Zone Deployment Guide

## 🌐 Frontend Deployment (Netlify)

### Step 1: Build Your Angular App
```bash
cd frontend
ng build --configuration production
```

### Step 2: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) and sign up
2. Drag and drop your `dist/pestzone-frontend` folder
3. Or connect your GitHub repository for automatic deployments

### Step 3: Configure Domain (Optional)
- Use provided subdomain: `https://your-site-name.netlify.app`
- Or connect your custom domain

---

## 🖥️ Backend Deployment (Railway)

### Step 1: Prepare Backend for Production
Already done ✅ Your server.js is production-ready

### Step 2: Deploy to Railway
1. Go to [railway.app](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway auto-detects Node.js and deploys

### Step 3: Set Environment Variables
In Railway dashboard:
- `EMAIL_USER`: santoshkadam1916@gmail.com
- `EMAIL_PASS`: your-gmail-app-password
- `PORT`: 3000

---

## 🔗 Connect Frontend to Backend

After deployment, update your Angular app with the backend URL.

**Production Backend URL**: `https://your-backend.railway.app`

---

## 📱 Alternative Deployment Options

### Free Options:
- **Vercel**: Both frontend + backend
- **Render**: Backend deployment
- **GitHub Pages**: Frontend only (static)

### Paid Options:
- **DigitalOcean**: $5/month droplet
- **AWS**: Pay-as-you-go
- **Google Cloud**: Pay-as-you-go

---

## ✅ Deployment Checklist

- [ ] Build Angular app for production
- [ ] Deploy frontend to Netlify
- [ ] Deploy backend to Railway
- [ ] Set environment variables
- [ ] Update API URLs in frontend
- [ ] Test contact form
- [ ] Set up custom domain (optional)
- [ ] Configure SSL certificates
- [ ] Set up monitoring