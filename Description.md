## 🔧 Database Schema

### 1. user Table

| Column   | Type    |
|----------|---------|
| user_id  | INTEGER |
| name     | TEXT    |
| username | TEXT    |
| password | TEXT    |
| gender   | TEXT    |

### 2. habit table
| Column      | Type     |
| ----------- | -------- |
| habit\_id   | INTEGER  |
| habit\_name | TEXT     |
| description | TEXT     |
| user\_id    | INTEGER  |
| created\_at | DATETIME |

### 3. log table
| Column    | Type    |
| --------- | ------- |
| log\_id   | INTEGER |                                 
| habit\_id | INTEGER |                                  
| user\_id  | INTEGER |                                  
| date      | DATE    |                                  
| status    | TEXT    | 

### 4.streak Table
| Column          | Type     |
| --------------- | -------- |
| streak\_id      | INTEGER  |
| habit\_id       | INTEGER  |
| user\_id        | INTEGER  |
| current\_streak | INTEGER  |
| longest\_streak | INTEGER  |
| updated\_at     | DATETIME |

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
Middleware validates JWT token passed in the Authorization header.

Scenarios:
- Missing/invalid token → 401: Invalid JWT Token
- Valid token → proceeds to route handler

  

  



