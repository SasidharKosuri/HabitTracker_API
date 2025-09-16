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
| Column    | Type    |                                  |
| --------- | ------- | -------------------------------- |
| log\_id   | INTEGER |                                  |
| habit\_id | INTEGER |                                  |
| user\_id  | INTEGER |                                  |
| date      | DATE    |                                  |
| status    | TEXT    | <!-- e.g. 'done' or 'missed' --> |



