# 📅 Habit Tracker Backend

A secure, feature-rich, and scalable backend application for tracking daily habits, developed using Node.js, Express.js, and SQLite. This project is designed to simulate the core functionality of a real-world habit tracker from a backend perspective. It includes robust user authentication using JWT tokens, secure password handling with bcrypt, and a relational database structure that manages users, habits, and daily logs efficiently.

The backend supports essential habit tracking operations such as user registration and login, creating habits, marking daily completion, tracking streaks, and viewing habit analytics. Additionally, it provides authenticated users with features like accessing their daily habit list, viewing progress, and safely performing create, read, update, and delete operations on habits. All functionalities are exposed via a well-structured set of RESTful APIs, designed with a focus on real-world authentication flow, authorization, and data validation.

---

## 🚀 Features
- ✅ User Registration and Login with JWT Authentication
- ✅ Create, read, update, and delete habits
- ✅ Mark habits as done each day
- ✅ View daily and weekly progress
- ✅ Track current and longest streaks for each habit
- ✅ Get analytics: completion percentage per habit
- ✅ Secure access with authentication middleware

---

## 🛠️ Tech Stack
- **Backend:**: Node.js, Express.js
- **Database:** SQLite
- **Security:** bcrypt for password hashing, JWT for session management

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/twitter-clone-backend.git
   cd twitter-clone-backend
2. **Install dependencies**
   ```bash
   npm install
3. **Start the server**
   ```bash
   node app.js
3. **Server will run at http://localhost:3000/**

---

   ## 🔐 Authentication
All routes (except /register/ and /login/) are protected and require a valid JWT token in the Authorization header: 
- Authorization: Bearer your-jwt-token

---

  ## 📂 Folder Structure
 - app.js              -> Main Express server
 - habitTracker.db     -> SQLite database file
 - package.json
 - README.md

---

📑 API Endpoints Summary
| Method | Endpoint                    | Description                                    |
| ------ | --------------------------- | ---------------------------------------------- |
| POST   | `/register/`                | Register a new user                            |
| POST   | `/login/`                   | Login and get JWT token                        |
| GET    | `/habits/`                  | Get list of your habits                        | 
| POST   | `/habits/`                  | Create a new habit                             |
| PUT    | `/habits/:habitId/`         | Update habit details                           |
| DELETE | `/habits/:habitId/`         | Delete a habit                                 |
| POST   | `/habits/:habitId/logs/`    | Mark habit as done for the current day         |
| GET    | `/habits/:habitId/logs/`    | Get log history for a habit                    |
| GET    | `/analytics/streaks/`       | Get current streaks for all habits             |
| GET    | `/analytics/completion/`    | Get completion percentage for each habit       |


