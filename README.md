# EduFlow — College Course Registration System

A full-stack web application where college students can register, log in, browse available courses, enroll in them, and manage their academic schedule through a personal dashboard.

---

## 🚀 Live Demo

> Start the backend and serve the frontend locally — see [Getting Started](#getting-started).

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, JavaScript (DOM API, Fetch API) |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ODM) |
| Auth | JSON Web Tokens (JWT) |
| Version Control | Git & GitHub |

---

## ✨ Features

- **Premium Landing Page** — Animated hero section, glassmorphic app preview, ambient orb effects, scroll animations
- **User Authentication** — Register and log in with JWT-based session management
- **Dynamic Course Catalog** — Browse 24+ courses with live search and filters (department, availability, credits)
- **Course Enrollment** — Enroll or join the waitlist; Drop courses from your dashboard
- **Student Dashboard** — Live enrolled course table with credit stats, all driven by MongoDB
- **My Schedule** — Auto-generated weekly timetable grid (Mon–Fri) from enrolled courses
- **Transcripts** — Print-ready academic record with student profile and enrolled course list
- **Settings** — Profile editing, notification toggles, and password change form with 3 tabs
- **Protected Routes** — All enrollment API endpoints secured with JWT middleware
- **Fully Responsive** — Mobile-friendly layout across all pages

---

## 📁 Project Structure

```
/
├── backend/
│   ├── config/
│   │   └── db.js               # Mongoose MongoDB connection
│   ├── middleware/
│   │   └── auth.js             # JWT verification middleware (protects private routes)
│   ├── models/
│   │   ├── Course.js           # Course schema (code, title, credits, prof, time, status)
│   │   └── User.js             # User schema with enrolledCourses[] reference array
│   ├── routes/
│   │   ├── authRoutes.js       # POST /api/register, POST /api/login (issues JWT)
│   │   ├── courseRoutes.js     # GET /api/courses (auto-upserts 24 courses on every call)
│   │   └── enrollRoutes.js     # GET/POST/DELETE /api/user/enroll (JWT protected)
│   └── server.js               # Express entry point on port 5000
│
├── frontend/
│   ├── css/
│   │   └── style.css           # Global styles, responsive layouts, component classes
│   ├── js/
│   │   ├── api.js              # Fetch API wrapper — auto-injects JWT header
│   │   ├── auth.js             # Login & register form validation + localStorage session
│   │   ├── courses.js          # Dynamic rendering, live filters, enroll logic, auth-aware navbar
│   │   ├── dashboard.js        # Enrollment table rendering + drop course logic
│   │   └── main.js             # Mobile navbar toggle
│   ├── index.html              # Landing page (hero, features, stats, CTA)
│   ├── login.html              # Login form
│   ├── register.html           # Registration form
│   ├── courses.html            # Course catalog with live filters
│   ├── dashboard.html          # Student dashboard with enrolled courses & stats
│   ├── schedule.html           # Weekly timetable grid (built from enrollments)
│   ├── transcripts.html        # Academic transcript view with print support
│   └── settings.html           # Profile / Notifications / Security settings tabs
│
├── .env                         # Environment variables (gitignored)
├── .gitignore
├── package.json
└── README.md
```

---

## 🏁 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v16+
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
The `.env` file is gitignored for security. Create it manually in the project root:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/eduflow
JWT_SECRET=your_secret_key_here
```

### 4. Start the backend server
```bash
node backend/server.js
```
> The server starts on `http://localhost:5000`.
> On every startup, the course catalog is automatically **upserted** — new courses are added to MongoDB without clearing existing enrollments.

### 5. Serve the frontend
```bash
npx serve frontend
```
> Opens the frontend at `http://localhost:3000`.

---

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/register` | ❌ | Register a new student account |
| `POST` | `/api/login` | ❌ | Authenticate and receive a JWT token |
| `GET` | `/api/courses` | ❌ | Fetch all courses (upserts 24 courses on call) |
| `GET` | `/api/user/enrollments` | ✅ | Get the logged-in student's enrolled courses |
| `POST` | `/api/user/enroll` | ✅ | Enroll in a course by ID |
| `DELETE` | `/api/user/enroll/:courseId` | ✅ | Drop an enrolled course |

---

## 📚 Course Catalog (24 Courses)

| Department | Courses |
|---|---|
| 💻 Computer Science | CS101, CS202, CS305, CS350, CS410, CS450 |
| ➗ Mathematics | MATH210, MATH315, MATH320, MATH430 |
| ⚙️ Engineering | ENG301, ENG360, ENG410, ENG450 |
| ⚛️ Physics | PHY201, PHY310, PHY405 |
| 🎨 Arts & Humanities | ART101, ART210, ART305 |
| 💼 Business | BUS201, BUS310, BUS401, BUS450 |

---

## 🎨 Color Palette

| Name | Hex |
|---|---|
| Purple Baseline | `#161748` |
| Pink Highlight | `#f95d9b` |
| Bluewater Lowlight | `#39a0ca` |
| Green Treeline | `#478559` |
