# QuickEMS — Full Stack Employee Management System

A production-ready full-stack Employee Management System built with **MongoDB**, **Express**, **React**, and **Node.js**. Handles everything from employee onboarding to payslip generation with automated background workflows powered by Inngest.

---

## ✨ Features

### Backend
- **JWT Authentication** — Stateless token-based auth with role-based access (ADMIN / EMPLOYEE)
- **Password Hashing** — bcrypt with salt rounds of 10
- **Role-Based Access Control** — Protected routes with `protect` and `protectAdmin` middleware
- **File Uploads** — Multer for handling multipart form data
- **Email Notifications** — Nodemailer integration for transactional emails
- **Automated Background Jobs** — Inngest-powered event-driven workflows
- **Seed Script** — One-command admin user bootstrapping

### Frontend
- **React 19** with functional components and Hooks
- **React Router v7** — Client-side routing with role-specific login portals
- **Auth Context** — Global state management via React Context API
- **Axios** — Centralized HTTP client with base URL configuration
- **Tailwind CSS v4** — Utility-first styling
- **Toast Notifications** — `react-hot-toast` for user feedback
- **Printable Payslips** — Dedicated print view for payslip documents
- **Responsive Sidebar** — Collapsible navigation with role-aware menu items

### Automated Workflows (Inngest)
- **Auto Check-Out** — Triggers after 9 hours if an employee forgets to check out; sends a reminder email and auto-marks the record
- **Leave Application Reminder** — Notifies admin of pending leave applications requiring action
- **Daily Attendance Cron** — Runs at 11:30 AM, identifies absent employees not on approved leave, and fires reminder emails

---

## 🗂️ Project Structure

```
FULLSTACK-EMS/
├── server/
│   ├── config/
│   │   ├── db.js                     # MongoDB connection
│   │   └── nodemailer.js             # SMTP email client
│   ├── constants/
│   │   └── department.js             # Department enum list
│   ├── controllers/
│   │   ├── authController.js         # Login, session, change password
│   │   ├── attendanceController.js   # Clock in/out
│   │   ├── dashboardController.js    # Aggregated dashboard stats
│   │   ├── employeeController.js     # CRUD for employees
│   │   ├── leaveController.js        # Apply, list, approve/reject leaves
│   │   ├── payslipController.js      # Generate and retrieve payslips
│   │   └── profileController.js      # View and update employee profile
│   ├── inngest/
│   │   └── index.js                  # Background job definitions
│   ├── middleware/
│   │   └── authMiddleware.js         # JWT protect + requireAdmin guards
│   ├── models/
│   │   ├── User.js                   # Auth user (email, password, role)
│   │   ├── Employee.js               # Employee profile & compensation
│   │   ├── Attendance.js             # Daily check-in/out records
│   │   ├── LeaveApplication.js       # Leave requests & status
│   │   └── Payslip.js                # Monthly payslip records
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── employeeRoutes.js
│   │   ├── attendanceRoutes.js
│   │   ├── leaveRoute.js
│   │   ├── payslipsRoutes.js
│   │   ├── dashboardRoutes.js
│   │   └── profileRoutes.js
│   ├── seed.js                       # Admin user seeder
│   ├── server.js                     # Express entry point
│   ├── vercel.json                   # Vercel serverless config
│   └── .env-example
│
└── client/
    ├── public/
    │   ├── favicon.svg
    │   └── icons.svg
    └── src/
        ├── api/
        │   └── axios.js              # Axios instance with base URL
        ├── assets/
        │   ├── assets.jsx            # Static assets / icons
        │   ├── email-template.js     # Email HTML templates
        │   └── index.css
        ├── Components/
        │   ├── attendance/
        │   │   ├── AttendanceHistory.jsx
        │   │   ├── AttendanceStats.jsx
        │   │   └── CheckInButton.jsx
        │   ├── leave/
        │   │   ├── ApplyLeaveModal.jsx
        │   │   └── LeaveHistory.jsx
        │   ├── payslip/
        │   │   ├── GeneratePaySlipForm.jsx
        │   │   └── PayslipList.jsx
        │   ├── AdminDashboard.jsx
        │   ├── ChangePasswordModal.jsx
        │   ├── EmployeeCard.jsx
        │   ├── EmployeeDashboard.jsx
        │   ├── EmployeeForm.jsx
        │   ├── Loading.jsx
        │   ├── LoginForm.jsx
        │   ├── LoginLeftSide.jsx
        │   ├── ProfileForm.jsx
        │   └── Sidebar.jsx
        ├── context/
        │   └── AuthContext.jsx       # Auth state + helpers
        ├── Pages/
        │   ├── Attendance.jsx
        │   ├── Dashboard.jsx
        │   ├── Employees.jsx
        │   ├── Layout.jsx
        │   ├── Leave.jsx
        │   ├── LoginLanding.jsx
        │   ├── PaySlips.jsx
        │   ├── PrintPaySlip.jsx
        │   └── Settings.jsx
        ├── App.jsx
        └── main.jsx
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- An [Inngest](https://www.inngest.com/) account (for background jobs)
- An SMTP provider (Gmail, Resend, etc.) for email

### 1. Clone & Install

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Configure Environment

```bash
cd server
cp .env-example .env
```

Edit `server/.env`:

```env
JWT_SECRET="your-super-secret-jwt-key"

MONGODB_URI="mongodb://localhost:27017/ems"

ADMIN_EMAIL="admin@yourcompany.com"

INNGEST_EVENT_KEY="your-inngest-event-key"
INNGEST_SIGNING_KEY="your-inngest-signing-key"

SMTP_USER="your-smtp-username"
SMTP_PASS="your-smtp-password"
SENDER_EMAIL="noreply@yourcompany.com"
```

Configure the client API base URL in `client/.env`:

```env
VITE_API_URL=http://localhost:4000
```

### 3. Seed the Admin User

Run the seed script once to create the initial admin account:

```bash
cd server
npm run seed
```

This creates an admin user with the email from `ADMIN_EMAIL` and a temporary password of `admin123`. **Change this immediately after your first login** via Settings → Change Password.

### 4. Run Development

```bash
# Terminal 1 — Backend (port 4000)
cd server
npm run server

# Terminal 2 — Frontend (port 5173)
cd client
npm run dev
```

### 5. Build for Production

```bash
cd client
npm run build
```

Both `server/vercel.json` and `client/vercel.json` are included for Vercel deployment.

---

## 🔌 API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint              | Access    | Description                  |
|--------|-----------------------|-----------|------------------------------|
| POST   | `/login`              | Public    | Login and receive JWT token  |
| GET    | `/session`            | 🔒 Any    | Validate token, get user info |
| POST   | `/change-password`    | 🔒 Any    | Update account password      |

### Employee Routes — `/api/employees`

| Method | Endpoint  | Access       | Description              |
|--------|-----------|--------------|--------------------------|
| GET    | `/`       | 🔒 Admin     | List all employees       |
| POST   | `/`       | 🔒 Admin     | Create a new employee    |
| PUT    | `/:id`    | 🔒 Admin     | Update employee details  |
| DELETE | `/:id`    | 🔒 Admin     | Soft-delete an employee  |

### Attendance Routes — `/api/attendance`

| Method | Endpoint | Access  | Description                       |
|--------|----------|---------|-----------------------------------|
| POST   | `/`      | 🔒 Any  | Clock in or clock out             |
| GET    | `/`      | 🔒 Any  | Get attendance records            |

### Leave Routes — `/api/leave`

| Method | Endpoint | Access      | Description                      |
|--------|----------|-------------|----------------------------------|
| POST   | `/`      | 🔒 Any      | Apply for leave                  |
| GET    | `/`      | 🔒 Any      | Get leave applications           |
| PATCH  | `/:id`   | 🔒 Admin    | Approve or reject a leave request |

### Payslip Routes — `/api/payslips`

| Method | Endpoint | Access      | Description                    |
|--------|----------|-------------|--------------------------------|
| POST   | `/`      | 🔒 Admin    | Generate a payslip             |
| GET    | `/`      | 🔒 Any      | Get payslips for current user  |
| GET    | `/:id`   | 🔒 Any      | Get a specific payslip by ID   |

### Other Routes

| Method | Endpoint            | Access  | Description                  |
|--------|---------------------|---------|------------------------------|
| GET    | `/api/dashboard`    | 🔒 Any  | Role-aware dashboard stats   |
| GET    | `/api/profile`      | 🔒 Any  | Get own employee profile     |
| POST   | `/api/profile`      | 🔒 Any  | Update own employee profile  |

### Request Format

**Login:**
```json
{ "email": "admin@example.com", "password": "admin123" }
```

**Authorization Header (all protected routes):**
```
Authorization: Bearer <token>
```

---

## 🗃️ Data Models

### User
| Field      | Type   | Notes                              |
|------------|--------|------------------------------------|
| email      | String | Unique, required                   |
| password   | String | bcrypt hashed                      |
| role       | String | `ADMIN` or `EMPLOYEE`              |

### Employee
| Field            | Type    | Notes                                          |
|------------------|---------|------------------------------------------------|
| userId           | ObjectId | Ref to User, unique                           |
| firstName        | String  | Required                                       |
| lastName         | String  | Required                                       |
| email            | String  | Required                                       |
| phone            | String  | Required                                       |
| position         | String  | Job title                                      |
| department       | String  | One of 10 preset departments                   |
| basicSalary      | Number  | Base pay                                       |
| allowances       | Number  | Additional allowances                          |
| deductions       | Number  | Deductions                                     |
| employmentStatus | String  | `ACTIVE` or `INACTIVE`                         |
| joinDate         | Date    | Required                                       |
| isDeleted        | Boolean | Soft delete flag                               |
| bio              | String  | Optional biography                             |

### Attendance
| Field        | Type    | Notes                                                        |
|--------------|---------|--------------------------------------------------------------|
| employeeId   | ObjectId | Ref to Employee                                            |
| date         | Date    | One record per employee per day (unique compound index)      |
| checkIn      | Date    | Timestamp                                                    |
| checkOut     | Date    | Timestamp                                                    |
| status       | String  | `PRESENT`, `ABSENT`, or `LATE`                              |
| workingHours | Number  | Computed on check-out                                        |
| dayType      | String  | `Full Day`, `Three Quarter Day`, `Half Day`, or `Short Day` |

### LeaveApplication
| Field      | Type    | Notes                          |
|------------|---------|--------------------------------|
| employeeId | ObjectId | Ref to Employee               |
| type       | String  | `SICK`, `CASUAL`, or `ANNUAL` |
| startDate  | Date    | Required                       |
| endDate    | Date    | Required                       |
| reason     | String  | Required                       |
| status     | String  | `PENDING`, `APPROVED`, or `REJECTED` (default: `PENDING`) |

### Payslip
| Field       | Type   | Notes                       |
|-------------|--------|-----------------------------|
| employeeId  | ObjectId | Ref to Employee            |
| month       | Number | 1–12                        |
| year        | Number | e.g., 2025                  |
| basicSalary | Number | Required                    |
| allowances  | Number | Default 0                   |
| deductions  | Number | Default 0                   |
| netSalary   | Number | Required (computed by admin)|

---

## ⚙️ Background Jobs (Inngest)

Three automated functions run via Inngest:

| Function                   | Trigger                      | Description                                                               |
|----------------------------|------------------------------|---------------------------------------------------------------------------|
| `auto-check-out`           | `employee/check-out` event   | Waits 9 hours post check-in; sends reminder if no check-out; auto-closes after 10 hours |
| `leave-application-reminder` | `leave/applied` event      | Notifies admin when a new leave request is submitted                      |
| `attendance-reminder-cron` | Daily cron at 11:30 AM       | Identifies absent employees (excluding those on approved leave) and emails them |

To test Inngest locally, run the Inngest Dev Server alongside your backend:

```bash
npx inngest-cli@latest dev
```

---

## 🏬 Departments

Employees can be assigned to any of the following departments:

> Engineering · Human Resources · Marketing · Sales · Finance · Operations · IT Support · Customer Success · Product Management · Design

---

## 🖥️ Frontend Pages

| Route                   | Access       | Description                                     |
|-------------------------|--------------|--------------------------------------------------|
| `/login`                | Public       | Role selection landing page                      |
| `/login/admin`          | Public       | Admin login portal                              |
| `/login/employee`       | Public       | Employee login portal                           |
| `/dashboard`            | 🔒 Any       | Role-aware dashboard (admin stats vs employee view) |
| `/employees`            | 🔒 Admin     | Employee list, create, edit, soft-delete        |
| `/attendance`           | 🔒 Any       | Clock in/out, attendance history & stats        |
| `/leave`                | 🔒 Any       | Apply for leave; admins approve/reject requests |
| `/payslips`             | 🔒 Any       | View payslips; admins generate new ones         |
| `/settings`             | 🔒 Any       | Edit profile and change password                |
| `/print/payslips/:id`   | 🔒 Any       | Print-ready payslip view                        |

---

## 📦 Tech Stack

| Layer       | Technology                                             |
|-------------|--------------------------------------------------------|
| Frontend    | React 19, React Router v7, Tailwind CSS v4, Axios      |
| Backend     | Node.js, Express 5                                     |
| Database    | MongoDB, Mongoose                                      |
| Auth        | JWT, bcrypt                                            |
| Email       | Nodemailer                                             |
| Background  | Inngest (event-driven + cron)                          |
| File Upload | Multer                                                 |
| Dev Tools   | Vite, nodemon, ESLint                                  |
| Deploy      | Vercel (client + server configs included)              |

---

## 🔧 Scripts Reference

### Server

| Script          | Command              | Description                            |
|-----------------|----------------------|----------------------------------------|
| Start (prod)    | `npm start`          | Run server with Node                   |
| Start (dev)     | `npm run server`     | Run server with nodemon (auto-reload)  |
| Seed admin      | `npm run seed`       | Create initial admin user              |

### Client

| Script    | Command          | Description                   |
|-----------|------------------|-------------------------------|
| Dev       | `npm run dev`    | Start Vite dev server         |
| Build     | `npm run build`  | Production build              |
| Preview   | `npm run preview`| Preview production build      |
| Lint      | `npm run lint`   | Run ESLint                    |

---

## 🔐 Security Notes

- Passwords are hashed with bcrypt before storage
- JWT tokens are verified on every protected request
- Admin-only routes enforce a second `protectAdmin` middleware check
- Employee soft-deletion (`isDeleted: true`) preserves historical records
- Change the default seed password (`admin123`) immediately after first login
- Never commit your `.env` file — use `.env-example` as a reference
