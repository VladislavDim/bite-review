# 🍽️ BiteReview – Full Stack Application

**BiteReview** is a modern restaurant review platform where users can browse, review, and manage restaurants. Built with a full-stack architecture using React.js for the frontend and Node.js with MongoDB for the backend.

---

## 📁 Project Structure

```
bite-review/
├── client/         # React frontend application
├── server/         # Node.js + Express backend with MongoDB
```

---

## 🧠 Key Features

### 👨‍🍳 For Restaurant Owners
- Add, edit, and delete restaurants
- View reviews left by users
- Cannot review their own restaurants

### 👤 For Registered Users
- Explore restaurant listings
- Leave reviews and ratings
- Like and reply to other reviews
- Filter and sort restaurants

### 🌐 For Guests
- Browse public listings
- View reviews and restaurant details

---

## 🛠️ Tech Stack

- **Frontend**: React.js, React Router, TailwindCSS, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Auth**: JWT Authentication with role-based access control
- **Utilities**: Multer (image upload), UUID, CORS

---

## 🚀 How to Run Locally

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

---

## 💡 Planned Improvements

- ✅ Image gallery for restaurants
- ✅ Recursive replies to reviews
- ✅ Review rating system (like/dislike)
- ✅ Pagination and sorting
- ✅ Profile avatars and bios
- ✅ Reviewer level system
- ✅ Admin panel

---

## 📄 License

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute it for personal or commercial use.
