# 🍽️ BiteReview - React Application

**BiteReview** is a modern restaurant review platform where users can browse, review, and manage restaurants. The application is structured to serve both restaurant owners and regular users, offering a smooth and dynamic experience with personalized features.

---

## 📚 Table of Contents
- [🚀 Live Preview](#-live-preview)
- [📁 Project Structure](#-project-structure)
- [🧠 Key Features](#-key-features)
- [🧭 Navigation](#-navigation)
- [🛠️ Tech Stack](#-tech-stack)
- [📌 Status](#-status)
- [🚀 How to Run Locally](#-how-to-run-locally)
- [💡 Future Improvements](#-future-improvements)
- [📄 License](#-license)

---

## 🚀 Live Preview
> Coming soon...

---

## 📁 Project Structure

The project is organized into a mono-repo structure with two main folders: one for the frontend client and one for the backend server, provided by the [SoftUni Practice Server](https://github.com/softuni-practice-server/softuni-practice-server).

```
BiteReview-React-App/
├── client/                   # Frontend React application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── api/              # API logic and endpoints
│   │   ├── assets/           # Images and static files
│   │   ├── components/       # Reusable UI components
│   │   ├── contexts/         # Global context providers
│   │   ├── hooks/            # Custom React hooks
│   │   ├── pages/            # Page-level components
│   │   ├── App.jsx           # Main React app
│   │   └── main.jsx          # Entry point
│   └── tailwind.config.js    # TailwindCSS setup
│
└── server/                   # Provided REST backend by SoftUni
    └── data/                 # JSON files representing data collections
```

---

## 🧠 Key Features

### 👨‍🍳 For Restaurant Owners
- Create, edit, and delete their restaurants
- View feedback left by users
- Cannot rate their own establishments (to ensure fairness)

### 👤 For Registered Users
- Browse and explore restaurant listings
- Leave reviews with detailed ratings
- Filter restaurants by ownership (mine, others, all)
- Sort listings by name, rating, and number of reviews

### 🌐 For Guests
- View restaurants and their ratings
- Cannot interact or leave reviews

---

## 🧭 Navigation

| Page                  | Description                                        |
|-----------------------|----------------------------------------------------|
| **Home**              | Landing section with highlights and previews      |
| **Restaurants**       | Full list with filters and sorting options        |
| **Restaurant Details**| Detailed view with user reviews and features      |
| **My Profile**        | User data, reviews, stats, and logout             |
| **Login / Register**  | Authentication screens for access                 |

---

## 🛠️ Tech Stack

- **Frontend:** React.js, React Router, TailwindCSS, React Icons
- **Backend:** Practice server provided by [SoftUni](https://github.com/softuni-practice-server/softuni-practice-server)

---

## 📌 Status

🚧 **In Progress**  
The platform is actively being developed. The core structure and functionality for browsing, sorting, reviewing, and managing restaurants is implemented.

---

## 🚀 How to Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/BiteReview-React-App.git
cd BiteReview-React-App

# 2. Install frontend dependencies
cd client
npm install
npm run dev

# 3. Run backend server
cd ../server
node server.js
```

---

## 💡 Future Improvements

### 📝 Reviews & Feedback
- ✅ Like/upvote reviews
- ✅ Add replies or threads to reviews
- ✅ Allow image attachments in reviews

### 👤 User Experience
- ✅ Profile avatars
- ✅ Add bios or short status
- ✅ Reviewer reputation system (rank/levels)

### 🏅 Rankings & Badging
- ✅ Restaurant ranking by performance
- ✅ Top reviewers board
- ✅ Visual badges for active contributors

### 🎛️ Filtering & Sorting
- ✅ Filters by cuisine, tags, or features
- ✅ Server-side filtering for performance
- ✅ Sorting UX with better icons and animation

### 🖼️ UI/UX Enhancements
- ✅ Responsive layout and grid
- ✅ Lazy image loading
- ✅ ARIA and accessibility improvements

### 🧰 Developer Improvements
- ✅ Pagination via query params
- ✅ Caching or localStorage for smoother UX
- ✅ API refactor for scalability

---

## 📄 License

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute this project for personal and commercial use.

📜 See the full license in [`LICENSE`](./LICENSE)
