const express = require("express");
const app = express();
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(express.json());

const dbPath = path.join(__dirname, "habitTracker.db");
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });
    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000/");
    });
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

// Middleware to authenticate JWT Token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  let jwtToken;

  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }

  if (jwtToken === undefined) {
    return res.status(401).send("Invalid JWT Token");
  }

  jwt.verify(jwtToken, "MY_SECRET_TOKEN", (error, payload) => {
    if (error) {
      return res.status(401).send("Invalid JWT Token");
    } else {
      req.user = payload;
      next();
    }
  });
};

// API 1: Register User
app.post("/register/", async (req, res) => {
  const { username, password, name, gender } = req.body;

  const userExists = await db.get(
    `SELECT * FROM user WHERE username = ?`,
    [username]
  );

  if (userExists) {
    return res.status(400).send("User already exists");
  }

  if (password.length < 6) {
    return res.status(400).send("Password is too short");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.run(
    `INSERT INTO user (name, username, password, gender)
     VALUES (?, ?, ?, ?)`,
    [name, username, hashedPassword, gender]
  );

  res.send("User created successfully");
});

// API 2: Login User
app.post("/login/", async (req, res) => {
  const { username, password } = req.body;

  const user = await db.get(
    `SELECT * FROM user WHERE username = ?`,
    [username]
  );

  if (!user) {
    return res.status(400).send("Invalid user");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return res.status(400).send("Invalid password");
  }

  const payload = { userId: user.user_id, username: user.username };
  const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");

  res.send({ jwtToken });
});

//API 3 : Get list of habits
app.get("/habits/", authenticateToken, async (req, res) => {
  const { userId } = req.user;

  const habits = await db.all(
    `SELECT habit_name AS habitName, description 
     FROM habit WHERE user_id = ?`,
    [userId]
  );

  res.send(habits);
});

//APi 4 : Create a habit 
app.post("/habits/", authenticateToken, async (req, res) => {
  const { userId } = req.user;
  const { habitName, description } = req.body;

  await db.run(
    `INSERT INTO habit (habit_name, description, user_id, created_at)
     VALUES (?, ?, ?, datetime('now'))`,
    [habitName, description, userId]
  );

  res.send("Habit Created Successfully");
});

//API 5 : Update a habit
app.put("/habits/:habitId/", authenticateToken, async (req, res) => {
  const { userId } = req.user;
  const { habitId } = req.params;
  const { habitName, description } = req.body;

  const habit = await db.get(
    `SELECT * FROM habit WHERE habit_id = ? AND user_id = ?`,
    [habitId, userId]
  );

  if (!habit) {
    return res.status(401).send("Invalid Request");
  }

  await db.run(
    `UPDATE habit SET habit_name = ?, description = ? WHERE habit_id = ?`,
    [habitName, description, habitId]
  );

  res.send("Habit Updated Successfully");
});

//API 6 : Delete a habit
app.delete("/habits/:habitId/", authenticateToken, async (req, res) => {
  const { userId } = req.user;
  const { habitId } = req.params;

  const habit = await db.get(
    `SELECT * FROM habit WHERE habit_id = ? AND user_id = ?`,
    [habitId, userId]
  );

  if (!habit) {
    return res.status(401).send("Invalid Request");
  }

  await db.run(`DELETE FROM habit WHERE habit_id = ?`, [habitId]);

  res.send("Habit Deleted Successfully");
});

//API 7 : CREATE a log 
app.post("/habits/:habitId/logs/", authenticateToken, async (req, res) => {
  const { userId } = req.user;
  const { habitId } = req.params;

  await db.run(
    `INSERT INTO log (habit_id, user_id, date, status)
     VALUES (?, ?, date('now'), 'done')`,
    [habitId, userId]
  );

  res.send("Habit marked as done");
});


//API 8 : GET logs for a habit 
app.get("/habits/:habitId/logs/", authenticateToken, async (req, res) => {
  const { userId } = req.user;
  const { habitId } = req.params;

  const logs = await db.all(
    `SELECT date, status FROM log WHERE habit_id = ? AND user_id = ?`,
    [habitId, userId]
  );

  res.send(logs);
});

//API 9 : GET streaks
app.get("/analytics/streaks/", authenticateToken, async (req, res) => {
  const { userId } = req.user;

  const streaks = await db.all(
    `SELECT h.habit_name AS habitName, 
            s.current_streak AS currentStreak,
            s.longest_streak AS longestStreak
     FROM streak s 
     JOIN habit h ON s.habit_id = h.habit_id
     WHERE s.user_id = ?`,
    [userId]
  );

  res.send(streaks);
});


//API 10 : GET completion
app.get("/analytics/completion/", authenticateToken, async (req, res) => {
  const { userId } = req.user;

  const habits = await db.all(
    `SELECT habit_id, habit_name FROM habit WHERE user_id = ?`,
    [userId]
  );

  const results = [];

  for (const habit of habits) {
    const totalLogs = await db.get(
      `SELECT COUNT(*) AS count FROM log WHERE habit_id = ? AND user_id = ?`,
      [habit.habit_id, userId]
    );

    const doneLogs = await db.get(
      `SELECT COUNT(*) AS count FROM log WHERE habit_id = ? AND user_id = ? AND status = 'done'`,
      [habit.habit_id, userId]
    );

    const completion = totalLogs.count === 0 
      ? "0%" 
      : Math.round((doneLogs.count / totalLogs.count) * 100) + "%";

    results.push({ habitName: habit.habit_name, completion });
  }

  res.send(results);
});

