# 🍽️ BiteReview – Full Stack Restaurant Review Platform

![React](https://img.shields.io/badge/Frontend-React-blue)
![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38bdf8?logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Express](https://img.shields.io/badge/API-Express-lightgrey)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Cloudinary](https://img.shields.io/badge/Image%20Hosting-Cloudinary-blueviolet)
![Resend](https://img.shields.io/badge/Email%20Verification-Resend-ff69b4)

---

**BiteReview** is a modern, full-stack web application built with the MERN stack, offering a complete solution for discovering, reviewing, and managing restaurants. It delivers a seamless experience for users and restaurant owners alike, ensuring real-time feedback and interaction.

---

## 📁 Project Structure

```bash
bite-review/
├── client/                 # React frontend application
│   ├── public/             # Static public assets (index.html, favicon, etc.)
│   └── src/
│       ├── api/            # API service handlers (axios, fetch, etc.)
│       ├── assets/         # Images, icons, and static resources
│       ├── components/     # Reusable UI components (buttons, cards, etc.)
│       ├── contexts/       # React Context API providers and hooks
│       ├── guards/         # Route guards (ProtectedRoute, OwnerRoute, etc.)
│       ├── hooks/          # Custom React hooks
│       ├── layouts/        # Layout components (MainLayout, AuthLayout, etc.)
│       ├── pages/          # Page components (Home, Login, Register, etc.)
│       ├── providers/      # Context providers (AuthProvider, ThemeProvider, etc.)
│       ├── styles/         # Global and component-specific styles (Tailwind, CSS)
│       └── utils/          # Utility functions and helpers
├── server/                 # Node.js + Express backend
│   ├── scripts/            # Seed and utility scripts (e.g., seedCities.js)
│   └── src/
│       ├── config/         # Configuration files (db, env, etc.)
│       ├── controllers/    # Express route controllers
│       ├── middlewares/    # Express middlewares (auth, error handling, etc.)
│       ├── models/         # Mongoose models (User, Restaurant, Review, etc.)
│       ├── routes/         # API route definitions
│       ├── services/       # Business logic and service layers
│       ├── utils/          # Helper utilities (validators, token, etc.)
│       └── app.js          # Express app entry point
├── .env.example            # Example environment variables
├── package.json            # Project metadata and scripts (root)
├── README.md               # Project documentation
└── ...                     # Other config files (gitignore, etc.)
```

---

## 🧐 Key Features

### 👨‍🍳 Restaurant Owners
- Add, edit, and delete restaurants securely.
- View and manage customer reviews and ratings.
- Protected against self-reviewing for fairness.

### 👤 Registered Users
- Explore and filter restaurant listings.
- Leave detailed reviews and 1-5 star ratings.
- Manage personal profiles, including edit capabilities.
- Receive verification email upon registration.

### 🌐 Guests
- Browse restaurants and view public reviews.
- Read restaurant details without authentication.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, TailwindCSS, React Router DOM
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT (with token blacklist for secure logout)
- **Other Tools:**
  - Multer (for handling image uploads)
  - UUID (for unique identifiers)
  - CORS (Cross-Origin Resource Sharing)
  - Resend (for transactional email verification)
  - Cloudinary (for scalable and persistent image hosting)
    
---

## 🔍 Additional Functionalities

- ✅ **Image validation** – server/client validation for size, type, and resolution (with Multer and custom logic).
- ✅ **Profile management** – secure editing of user data and avatar via FormData and PATCH request.
- ✅ **Email verification** – new users are required to verify their email via Resend.
- ✅ **Real restaurant data** – no mock data; actual restaurants and images are used for realism.
- ✅ **Advanced UI/UX** – includes animated carousels, custom 0.1-precision star rating, gradient scrollbars, responsive dropdowns, and hover transitions.
- ✅ **Filtering & sorting** – dynamic sorting by rating, name, review count, and ownership.
- ✅ **Review integrity** – prevents duplicate reviews and disallows self-reviews.

--- 

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.x
- MongoDB Atlas account or local MongoDB server

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/BiteReview.git
cd BiteReview

# 2. Install and run frontend
cd client
npm install
npm run dev

# 3. Install and run backend
cd ../server
npm install
npm run dev
```

### Environment Variables
Create a `.env` file inside the `server/` directory:
```bash

# Database
MONGO_URI=your_mongo_connection_string

# Authentication
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=2d

# Application Settings
PORT=5000
CLIENT_URL=http://localhost:5173

# Email verification (via Resend)
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=your_verified_sender@resend.dev

# Cloudinary credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

```

> Ensure MongoDB and the backend server are running before starting the frontend.

---

## 💡 Future Enhancements

- 🔄 Recursive replies and like/dislike interaction on reviews
- 📊 Admin dashboard with analytics for restaurant owners
- 🔔 Real-time notifications for user actions (e.g., new reviews)
- 🖼️ Multi-image upload per restaurant with gallery support
- 🏅 Reviewer ranking and trust-level system
- 📱 Fully optimized mobile-first experience
- ☁️ Deployment on Vercel / Render / Railway

---

## 📄 License

This project is licensed under the **MIT License**.

> Open for personal or commercial use. Contributions are welcome!

---

## 📙 Contact

For feedback, suggestions, or collaboration:

- GitHub: [VladislavDim](https://github.com/VladislavDim)
- Email: gumumpo6@gmail.com

---

_"Discover, review, and connect — with BiteReview."_
