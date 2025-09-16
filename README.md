# HabitTracker_API
📅 Habit Tracker Backend

A secure, feature-rich, and scalable backend platform for tracking daily habits, developed using Node.js, Express.js, and SQLite. This project allows users to register, log in, and manage their daily habits effectively. It includes robust user authentication using JWT tokens, secure password handling with bcrypt, and a relational database structure that manages users, habits, and habit logs efficiently.

The backend supports core habit tracking functionalities such as creating habits, logging their completion status each day, viewing progress over time, and getting analytics on streaks and completion rates. It provides authenticated users with features like accessing their daily habit list, marking habits as complete, and safely performing create, read, update, and delete operations on habits. All functionalities are exposed via a well-structured set of RESTful APIs, designed with a focus on real-world authentication flow, authorization, and data validation.

🚀 Features

✅ User Registration and Login with JWT Authentication
✅ Create, read, update, and delete habits
✅ Log daily completion of habits
✅ View daily and weekly progress of habits
✅ Track streaks and completion percentage for each habit
✅ Secure access with authentication middleware

🛠️ Tech Stack

Backend: Node.js, Express.js

Database: SQLite

Security: bcrypt for password hashing, JWT for session management

📦 Installation

Clone the repository:

git clone https://github.com/your-username/habit-tracker-backend.git
cd habit-tracker-backend


Install dependencies:

npm install


Start the server:

node app.js


Server will run at http://localhost:3000/

🔐 Authentication

All routes (except /register/ and /login/) are protected and require a valid JWT token in the Authorization header:

Authorization: Bearer your-jwt-token

📂 Folder Structure
app.js               -> Main Express server
habitTracker.db      -> SQLite database file
package.json
README.md

📑 API Endpoints Summary
Method	Endpoint	Description
POST	/register/	Register a new user
POST	/login/	Login and get JWT token
GET	/habits/	Get list of your habits
POST	/habits/	Create a new habit
PUT	/habits/:habitId/	Update habit details
DELETE	/habits/:habitId/	Delete a habit
POST	/habits/:habitId/logs/	Mark habit as done for the current day
GET	/habits/:habitId/logs/	Get log history for a habit
GET	/analytics/streaks/	Get current streaks for all habits
GET	/analytics/completion/	Get completion percentage for each habit
