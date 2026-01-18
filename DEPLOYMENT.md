# Expense Tracker - Deployment Guide

## 🚀 Deploying to Vercel

This guide will help you deploy both the client (React) and server (Express API) to Vercel.

### Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)
- MongoDB Atlas account (for production database)

---

## 📦 Step 1: Prepare Your Code

### 1.1 Push to GitHub
```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/expense-tracker.git
git branch -M main
git push -u origin main
```

---

## 🌐 Step 2: Deploy the Server (Backend)

### 2.1 Create MongoDB Atlas Database
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user
4. Whitelist all IPs (0.0.0.0/0) for serverless deployment
5. Get your connection string (e.g., `mongodb+srv://username:password@cluster.mongodb.net/expense-tracker`)

### 2.2 Deploy Server to Vercel
1. Go to https://vercel.com and sign in
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `server`
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty

5. **Add Environment Variables** (IMPORTANT):
   Click "Environment Variables" and add:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=production
   CLIENT_URL=https://your-client-domain.vercel.app
   ```

6. Click "Deploy"
7. Once deployed, copy your server URL (e.g., `https://expense-tracker-api.vercel.app`)

---

## 💻 Step 3: Deploy the Client (Frontend)

### 3.1 Update API URL in Client
Before deploying the client, update the API base URL:

1. Open `client/src/context/AuthContext.jsx`
2. Update the API_URL:
   ```javascript
   const API_URL = import.meta.env.VITE_API_URL || 'https://expense-tracker-api.vercel.app/api';
   ```

3. Open `client/src/context/TransactionContext.jsx`
4. Update the API_URL:
   ```javascript
   const API_URL = import.meta.env.VITE_API_URL || 'https://expense-tracker-api.vercel.app/api';
   ```

### 3.2 Create Environment File (Optional)
Create `client/.env.production`:
```
VITE_API_URL=https://your-server-url.vercel.app/api
```

### 3.3 Deploy Client to Vercel
1. Go to Vercel dashboard
2. Click "Add New" → "Project"
3. Import the same GitHub repository (or create a new import)
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. **Add Environment Variable**:
   ```
   VITE_API_URL=https://your-server-url.vercel.app/api
   ```

6. Click "Deploy"
7. Once deployed, you'll get your client URL (e.g., `https://expense-tracker-app.vercel.app`)

### 3.4 Update Server CORS
Go back to your server deployment on Vercel:
1. Go to Settings → Environment Variables
2. Update `CLIENT_URL` to your actual client URL
3. Redeploy the server

---

## ✅ Step 4: Verify Deployment

1. Visit your client URL: `https://your-client-url.vercel.app`
2. Try to:
   - Register a new account
   - Login
   - Add transactions
   - Create custom categories
   - Test all features

---

## 🔧 Alternative: Deploy as Separate Projects

### Option 1: Two Separate Repositories
1. Create two GitHub repos: `expense-tracker-client` and `expense-tracker-server`
2. Push client code to client repo
3. Push server code to server repo
4. Deploy each separately on Vercel

### Option 2: Monorepo with Multiple Projects
Vercel can deploy multiple projects from the same repository by specifying different root directories.

---

## 📝 Important Notes

### Environment Variables
Make sure these are set correctly:

**Server (.env or Vercel Environment Variables):**
```
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
NODE_ENV=production
CLIENT_URL=https://your-client-url.vercel.app
```

**Client (.env.production or Vercel Environment Variables):**
```
VITE_API_URL=https://your-server-url.vercel.app/api
```

### CORS Configuration
The server is already configured to accept requests from the CLIENT_URL. Make sure it's set correctly.

### Database Connection
- Use MongoDB Atlas for production
- Whitelist all IPs (0.0.0.0/0) in MongoDB Atlas Network Access
- Use the connection string format: `mongodb+srv://...`

---

## 🐛 Troubleshooting

### Issue: CORS errors
- Check that CLIENT_URL in server matches your actual client URL
- Redeploy server after updating environment variables

### Issue: Database connection fails
- Verify MongoDB Atlas connection string
- Check that IP whitelist includes 0.0.0.0/0
- Ensure database user has correct permissions

### Issue: API calls fail
- Verify VITE_API_URL is set correctly in client
- Check that server is deployed and accessible
- Open browser DevTools → Network tab to see failed requests

### Issue: Routes not working (404)
- For client: Vercel should handle SPA routing automatically with the vercel.json config
- For server: Check that all routes are properly defined

---

## 🎉 Success!

If everything is working:
- ✅ Users can register and login
- ✅ Transactions can be created, edited, deleted
- ✅ Custom categories work
- ✅ Dashboard displays correctly
- ✅ All features function properly

Your expense tracker is now live on Vercel! 🚀

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)
