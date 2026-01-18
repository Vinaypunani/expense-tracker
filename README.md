# 💰 Expense Tracker - iOS Style

A modern, mobile-first expense tracking application built with the MERN stack and styled with iOS-inspired design using Tailwind CSS v4.

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based user authentication with registration and login
- 🎨 **iOS-Themed Design** - Beautiful, native iOS-like interface with smooth animations
- 📱 **Mobile-First** - Optimized for mobile devices (390px - 428px primary breakpoints)
- 🌙 **Dark Mode** - Automatic dark mode support based on system preferences
- ⚡ **Fast & Modern** - Built with Vite for lightning-fast development

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS v4** - CSS-first configuration with @theme directive
- **React Router** - Client-side routing
- **Axios** - HTTP client with interceptors

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense-tracker
   ```

2. **Set up the Backend**
   ```bash
   cd server
   npm install
   ```

3. **Configure Environment Variables**
   
   Copy `.env.example` to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```

   Update `.env` with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/expense-tracker
   JWT_SECRET=your_super_secret_jwt_key_change_this
   JWT_EXPIRE=30d
   CLIENT_URL=http://localhost:5173
   ```

4. **Set up the Frontend**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start MongoDB** (if using local MongoDB)
   ```bash
   mongod
   ```

2. **Start the Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on `http://localhost:5000`

3. **Start the Frontend** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```
   Client will run on `http://localhost:5173`

4. **Open your browser** and navigate to `http://localhost:5173`

## 📱 Design Philosophy

This application follows Apple's Human Interface Guidelines with:

- **iOS Color Palette** - System blues, greens, reds matching iOS
- **SF Pro Typography** - Inter font as web alternative
- **Rounded Corners** - 12px-20px border radius for iOS feel
- **Smooth Animations** - 150-350ms transitions
- **Touch Optimizations** - 44px minimum tap targets
- **Glassmorphism** - Frosted glass effects on cards

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

## 📂 Project Structure

```
expense-tracker/
├── server/                 # Backend
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   └── server.js          # Entry point
└── client/                # Frontend
    ├── src/
    │   ├── components/    # Reusable components
    │   ├── context/       # React context
    │   ├── pages/         # Page components
    │   ├── utils/         # Utility functions
    │   ├── App.jsx        # Main app component
    │   ├── main.jsx       # Entry point
    │   └── index.css      # Tailwind CSS config
    └── index.html         # HTML template
```

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication
- HTTP-only cookie support
- CORS configuration
- Rate limiting (100 requests per 15 minutes)
- Helmet.js for security headers

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using MERN Stack and Tailwind CSS v4
