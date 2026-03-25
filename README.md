# EduFlow - College Course Registration System

A full-stack web application where college students can register, log in, browse available courses, enroll in them, and manage their academic schedule through a personal dashboard.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, JavaScript (DOM API, Fetch API) |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ODM) |
| Auth | JSON Web Tokens (JWT) |
| Version Control | Git & GitHub |

---

## Features

- **User Authentication** — Register and Log In with JWT-based session management
- **Dynamic Course Catalog** — Browse 12+ courses with live search and filters (department, availability, credits)
- **Course Enrollment** — Enroll in or join the waitlist for courses directly from the catalog
- **Student Dashboard** — View enrolled courses, total credits, and drop courses with one click
- **Protected Routes** — All enrollment API endpoints are secured with JWT middleware
- **Responsive Design** — Fully responsive layout for mobile, tablet, and desktop

---

## Project Structure

```
/
├── backend/
│   ├── config/
│   │   └── db.js               # Mongoose MongoDB connection
│   ├── middleware/
│   │   └── auth.js             # JWT verification middleware
│   ├── models/
│   │   ├── Course.js           # Course Mongoose schema
│   │   └── User.js             # User schema with enrolledCourses[]
│   ├── routes/
│   │   ├── authRoutes.js       # POST /api/register, POST /api/login
│   │   ├── courseRoutes.js     # GET /api/courses (auto-seeds DB)
│   │   └── enrollRoutes.js     # GET/POST/DELETE /api/user/enroll
│   └── server.js               # Express app entry point (port 5000)
│
├── frontend/
│   ├── css/
│   │   └── style.css           # Global styles, responsive layouts
│   ├── js/
│   │   ├── api.js              # Fetch API wrapper with JWT injection
│   │   ├── auth.js             # Login & register form validation logic
│   │   ├── courses.js          # Dynamic course rendering + live filters
│   │   ├── dashboard.js        # Enrollment table rendering + drop logic
│   │   └── main.js             # Mobile navbar toggle
│   ├── index.html              # Landing page
│   ├── login.html              # Login form
│   ├── register.html           # Registration form
│   ├── courses.html            # Course catalog with filters
│   └── dashboard.html          # Student dashboard
│
├── .env                         # Environment variables (gitignored)
├── .gitignore
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/try/download/community) running locally on port `27017`

### 1. Clone the repository
```bash
git clone https://github.com/ayoitssmit/EduFlow.git
cd EduFlow
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
The `.env` file is not committed for security. Create it manually:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/eduflow
JWT_SECRET=your_secret_key_here
```

### 4. Start the backend server
```bash
node backend/server.js
```
> The server starts on `http://localhost:5000`. On the **first launch**, the courses collection will be automatically seeded with 12 courses.

### 5. Serve the frontend
```bash
npx serve frontend
```
> Opens the frontend at `http://localhost:3000`.

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/register` | ❌ | Register a new student |
| `POST` | `/api/login` | ❌ | Login and receive JWT token |
| `GET` | `/api/courses` | ❌ | Fetch all available courses |
| `GET` | `/api/user/enrollments` | ✅ | Get user's enrolled courses |
| `POST` | `/api/user/enroll` | ✅ | Enroll in a course |
| `DELETE` | `/api/user/enroll/:courseId` | ✅ | Drop an enrolled course |

---

## Resetting the Course Catalog

If you want to re-seed the courses database with the latest course list, run:
```bash
node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGO_URI).then(async () => { await mongoose.connection.db.collection('courses').deleteMany({}); console.log('Courses cleared. Restart server to re-seed.'); process.exit(); });"
```
