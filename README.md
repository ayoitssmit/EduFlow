# EduFlow - College Course Registration System

EduFlow is a modern Web Application designed to allow college students to seamlessly register, log in, view available academic courses, and enroll in them online.

## Project Phases

This project is being developed in three primary phases:

- **Phase 1 (Completed):** Frontend visual structure and design using HTML5 and CSS3 (modern aesthetics, Flexbox, responsive grid).
- **Phase 2 (Completed):** Interaction logic using the JavaScript DOM API and Fetch API for seamless form validation, dynamic page rendering, and data exchange using JSON.
- **Phase 3 (Upcoming):** Backend integration using Node.js, Express.js, and MongoDB for active CRUD operations.

## Features Currently Implemented

*   **Responsive UI:** A beautiful, responsive interface utilizing generic CSS variables and smooth gradients.
*   **Authentication Forms:** Registration and Login forms backed by dynamic JS DOM validation (Email validation, password matching).
*   **Dynamic Course Catalog:** The `courses.html` grid dynamically fetches and renders a list of JSON course objects using the Fetch API.
*   **Fetch Utility:** A custom `api.js` file handles asynchronous mock server requests and responses.

## How to Run the Project (Locally with Backend)

Phase 3 requires a running MongoDB database and Node.js.

1. **Start MongoDB**: Ensure you have MongoDB running locally on port `27017`.
2. **Install Dependencies**: Open a terminal in the project root and run:
   ```bash
   npm install
   ```
3. **Start the Backend Server**:
   ```bash
   node backend/server.js
   ```
   *The server will start on `http://localhost:5000` and automatically seed the database with courses on the first load.*
4. **Run the Frontend**:
   - Open `frontend/index.html` with **Live Server** in VS Code, OR
   - Run `npx serve frontend` in a separate terminal.

## Project Structure (Full Stack)

```
/
├── backend/
│   ├── config/
│   │   └── db.js         # Mongoose DB Connection
│   ├── models/
│   │   ├── Course.js     # Course Schema
│   │   └── User.js       # User Schema
│   ├── routes/
│   │   ├── authRoutes.js # Login/Register logic
│   │   └── courseRoutes.js # Course fetching & seeding
│   └── server.js         # Express Server Entry
├── frontend/
│
├── index.html        # Landing page
├── register.html     # Registration form
├── login.html        # Login form
├── courses.html      # Course catalog viewer
├── dashboard.html    # Student enrollment dashboard
│
├── css/
│   └── style.css     # Global stylesheets and responsive layouts
│
└── js/
    ├── main.js       # Core UI interactivity (Navbar)
    ├── api.js        # Generic Fetch API wrapper and mock JSON backend
    ├── auth.js       # Register and Login DOM logic & Validation
    └── courses.js    # Logic for dynamically rendering courses
```
