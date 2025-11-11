# DevTinder 💻❤️

A modern developer networking platform that helps developers connect, collaborate, and build meaningful professional relationships. Swipe through developer profiles, send connection requests, and grow your network!

![DevTinder](https://img.shields.io/badge/DevTinder-Developer%20Networking-blue)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-8.19.2-47A248?logo=mongodb)

## ✨ Features

### 🔐 Authentication & User Management
- **User Registration & Login** - Secure authentication with JWT tokens
- **Password Management** - Change password functionality with strength validation
- **Profile Management** - Complete profile editing with photo uploads
- **Session Management** - Cookie-based authentication with automatic logout

### 👥 Developer Networking
- **Feed System** - Browse through developer profiles in a Tinder-like interface
- **Connection Requests** - Send "interested" or "ignore" requests to developers
- **Request Management** - Accept or reject incoming connection requests
- **Connections View** - See all your accepted connections in one place

### 🎨 User Experience
- **Modern UI** - Beautiful glassmorphism design with smooth animations
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Real-time Updates** - Instant UI updates with Redux state management
- **Toast Notifications** - User-friendly feedback for all actions
- **Loading States** - Smooth loading indicators for better UX

### 🔒 Security Features
- **Password Hashing** - Bcrypt encryption for secure password storage
- **JWT Authentication** - Token-based authentication system
- **Input Validation** - Server-side and client-side validation
- **CORS Protection** - Configured CORS for secure API access

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Modern UI library
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind
- **React Hot Toast** - Toast notifications
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express 5.1.0** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 8.19.2** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Validator** - Input validation
- **Cookie Parser** - Cookie handling

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas account)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd devtinder
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory:

```env
MONGODB_URI=mongodb://localhost:27017/devtinder
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/devtinder

JWT_SECRET=your-super-secret-jwt-key-here
PORT=3000
```

### 3. Frontend Setup

```bash
cd ../Frontend
npm install
```

Create a `.env` file in the `Frontend` directory (or update `src/utils/constants.js`):

```env
VITE_API_URL=http://localhost:3000
```

## 🏃 Running the Application

### Start Backend Server

```bash
cd Backend
npm run dev
```

The backend server will run on `http://localhost:3000`

### Start Frontend Development Server

```bash
cd Frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

### Production Build

```bash
# Frontend
cd Frontend
npm run build

# Backend
cd Backend
npm start
```

## 📁 Project Structure

```
devtinder/
├── Backend/
│   ├── src/
│   │   ├── app.js                 # Express app configuration
│   │   ├── config/
│   │   │   └── database.js        # MongoDB connection
│   │   ├── middlewares/
│   │   │   └── auth.js           # JWT authentication middleware
│   │   ├── models/
│   │   │   ├── user.js           # User schema
│   │   │   └── connectionRequest.js  # Connection request schema
│   │   ├── Routes/
│   │   │   ├── auth.js           # Authentication routes
│   │   │   ├── profile.js        # Profile management routes
│   │   │   ├── connection.js     # Connection request routes
│   │   │   └── user.js           # User feed & connections routes
│   │   └── utils/
│   │       └── validation.js    # Input validation utilities
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Body.jsx          # Main layout component
│   │   │   ├── Navbar.jsx        # Navigation bar
│   │   │   ├── Feed.jsx          # Developer feed page
│   │   │   ├── Usecard.jsx       # User profile card component
│   │   │   ├── Profile.jsx      # User profile page
│   │   │   ├── EditProfile.jsx  # Profile editing
│   │   │   ├── ChangePassword.jsx # Password change modal
│   │   │   ├── Connection.jsx    # Connections list
│   │   │   ├── Request.jsx       # Connection requests
│   │   │   ├── login.jsx         # Login page
│   │   │   └── Signup.jsx        # Signup page
│   │   ├── utils/
│   │   │   ├── appstore.js       # Redux store configuration
│   │   │   ├── userSlice.js      # User state management
│   │   │   ├── feedSlice.js      # Feed state management
│   │   │   ├── connectionSlice.js # Connections state
│   │   │   ├── RequestSlice.js   # Requests state
│   │   │   └── constants.js      # API URLs and constants
│   │   ├── App.jsx               # Main app component
│   │   └── main.jsx              # Entry point
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /signup` - Register a new user
- `POST /login` - User login
- `POST /logout` - User logout

### Profile Management
- `GET /profile/view` - Get current user profile (Protected)
- `PATCH /profile/edit` - Update user profile (Protected)
- `PATCH /profile/password` - Change password (Protected)

### Connection Requests
- `POST /request/send/:status/:userId` - Send connection request (interested/ignored) (Protected)
- `POST /request/review/:status/:requestId` - Accept/reject connection request (Protected)

### User Data
- `GET /feed` - Get developer feed (Protected)
- `GET /users/requests/recieved` - Get received connection requests (Protected)
- `GET /users/requests/connections` - Get all connections (Protected)

## 🎯 Usage Guide

### For Users

1. **Sign Up**: Create an account with email and password
2. **Complete Profile**: Add your photo, bio, skills, age, and gender
3. **Browse Feed**: Swipe through developer profiles
4. **Send Requests**: Click "Send Request" for developers you're interested in
5. **Manage Requests**: Accept or reject incoming connection requests
6. **View Connections**: See all your accepted connections

### For Developers

- All API endpoints require authentication except `/signup` and `/login`
- Use JWT token stored in HTTP-only cookies for authentication
- CORS is configured for `http://localhost:5173` (update for production)

## 🔧 Configuration

### Backend Environment Variables

```env
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key
PORT=3000
```

### Frontend Configuration

Update `src/utils/constants.js` or set environment variable:

```javascript
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```

## 🐛 Known Issues & Future Improvements

- [ ] Add email verification for password reset
- [ ] Implement real-time notifications
- [ ] Add search and filter functionality
- [ ] Implement chat/messaging feature
- [ ] Add profile photo upload functionality
- [ ] Implement pagination for feed
- [ ] Add user blocking/reporting feature

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

**Utkarsh Tyagi**

 
 

 

