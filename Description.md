## 🔧 Database Schema

### -- Users Table
CREATE TABLE user (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  gender TEXT
);

### -- Habits Table
CREATE TABLE habit (
  habit_id INTEGER PRIMARY KEY AUTOINCREMENT,
  habit_name TEXT NOT NULL,
  description TEXT,
  user_id INTEGER NOT NULL,
  created_at DATE DEFAULT (date('now')),
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);

### -- Logs Table
CREATE TABLE log (
  log_id INTEGER PRIMARY KEY AUTOINCREMENT,
  habit_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  date DATE DEFAULT (date('now')),
  status TEXT DEFAULT 'missed' CHECK(status IN ('done', 'missed')),
  UNIQUE(habit_id, user_id, date),
  FOREIGN KEY (habit_id) REFERENCES habit(habit_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);


## ✅ Core Functionalities

**🔐 User Registration** (/register/ – POST) 
Handles new user registration with password validation and username checks.

**Sample Request:**  
{  
  "username": "adam_richard",  
  "password": "richard_567",  
  "name": "Adam Richard",  
  "gender": "male"  
  }

Scenarios:
- Username already exists → 400: User already exists
- Password < 6 characters → 400: Password is too short
- Success → 200: User created successfully

**🔐 User Login**   (/login/ - POST)
Authenticates existing users and returns a JWT token on success.  


**Sample Request:**  
{  
"username": "JoeBiden",  
"password": "biden@123"  
}

Scenarios:
- Invalid user → 400: Invalid user
- Incorrect password → 400: Invalid password
- Success → 200: { "jwtToken": "<token>" }

**🔒 Authentication Middleware**
- Middleware validates JWT token passed in the Authorization header.

Scenarios:
- Missing/invalid token → 401: Invalid JWT Token
- Valid token → proceeds to route handler

**📋 Habit APIs**  
  
/habits/ – GET
- Returns all habits created by the logged-in user.

**Sample Response**
[
  {
    "habitName": "Morning Walk",
    "description": "Walk 5,000 steps daily"
  },
  {
    "habitName": "Meditation",
    "description": "10 mins of mindfulness"
  }
]


/habits/ – POST
- Creates a new habit.

**Sample Request**  
{ "habitName": "Read Books", "description": "Read 20 pages daily" }

**Response**  
Habit Created Successfully

/habits/:habitId/ – PUT  
- Updates the habit’s name or description.
- Unauthorized update → 401: Invalid Request
- Success → 200: Habit Updated Successfully

/habits/:habitId/ – DELETE  
- Deletes a habit only if it belongs to the user.
- Unauthorized delete → 401: Invalid Request
- Success → 200: Habit Deleted Successfully


**📝 Log APIs**

/habits/:habitId/logs/ – POST  
Marks a habit as done for the current date.

**Sample Response**  
Habit marked as done

/habits/:habitId/logs/ – GET  
Returns the daily logs for a specific habit.

**Sample Response**  
[
  { "date": "2025-09-14", "status": "done" },
  { "date": "2025-09-15", "status": "missed" }
]

**📊 Analytics APIs**

/analytics/streaks/ – GET  
Returns current and longest streaks for each habit.

**Sample Response**  
[
  { "habitName": "Meditation", "currentStreak": 5, "longestStreak": 12 },
  { "habitName": "Workout", "currentStreak": 2, "longestStreak": 8 }
]

/analytics/completion/ – GET  
Returns completion percentage for each habit (based on total days tracked).

**Sample Response**  
[
  { "habitName": "Meditation", "completion": "85%" },
  { "habitName": "Workout", "completion": "60%" }
]


**🔚 Summary**

- Exports Express app via CommonJS (module.exports = app)
- Uses relational SQL logic to handle habits, logs, and streaks
- JWT-based authentication and authorization
- Ideal for showcasing REST API design, authentication, and CRUD operations using Express and SQLite

  

  



