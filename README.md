# 🍽️ BiteReview – Full Stack Restaurant Review Platform

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Express](https://img.shields.io/badge/API-Express-lightgrey)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)

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
- Like, reply, and interact with other reviews (recursive nesting).
- Manage personal profiles, including edit capabilities.

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
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=2d
PORT=5000
CLIENT_URL=http://localhost:5173
```

> Ensure MongoDB and the backend server are running before starting the frontend.

---

## 💡 Future Enhancements

- ✅ Advanced search and filtering with multi-criteria
- ✅ Admin dashboard for restaurant owners
- ✅ Real-time notifications for new reviews
- ✅ Multi-image upload and gallery view
- ✅ Reviewer trust-level/ranking system
- ✅ Enhanced mobile-first UX
- ✅ Deployment on Vercel / Render / Railway

---

## 📄 License

This project is licensed under the **MIT License**.

> Open for personal or commercial use. Contributions are welcome!

---

## 📙 Contact

For feedback, suggestions, or collaboration:

- GitHub: [VladislavDim](https://github.com/VladislavDim)
- Email: vladislavdimitrov506@gmail.com

---

_"Discover, review, and connect — with BiteReview."_
