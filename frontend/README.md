# Faculty Grading System - React Frontend

Modern React + TypeScript frontend for the Faculty Grading System with beautiful UI and full backend integration.

## 🚀 Features

- **OAuth2 Authentication** - Secure Google login
- **Faculty Dashboard** - View faculty info and assigned courses
- **Smart Student Management** - Multi-select with dynamic update options
- **Real-time Grade Calculation** - Auto-updates based on marks
- **Modern UI** - Beautiful gradient design with Tailwind CSS
- **Type-Safe** - Full TypeScript coverage

## 📋 Prerequisites

- Node.js 18+ installed
- Backend running on `http://localhost:8080`

## 🛠️ Installation

```bash
# Install dependencies
npm install
```

## 🎯 Development

```bash
# Start dev server (runs on port 5173)
npm run dev
```

Then open http://localhost:5173 in your browser.

## 🔐 Login

1. Click "Sign in with Google"
2. Use a Google account with "faculty" in the email
3. Test accounts: `facultyalgo@gmail.com` or `facultymml1@gmail.com`

## 📱 Pages

### 1. Login Page (`/`)
- Clean, centered login card
- Google OAuth button
- Modern gradient background

### 2. Dashboard (`/dashboard`)
- Faculty ID, Name, Email display
- List of assigned courses
- Course selection dropdown

### 3. Student Marks (`/students/:courseId`)
- Student table with checkboxes
- Select All / Deselect All
- Dynamic update panel:
  - **1 student selected**: Set exact marks OR increase/decrease
  - **Multiple students**: Bulk increase/decrease only
- Real-time grade display (A/B/C/D/F)

## 🎨 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client

## 📦 Build for Production

```bash
# Build optimized production bundle
npm run build

# Output will be in `dist/` folder
```

## 🔌 Backend Integration

The frontend connects to:
- API Base: `http://localhost:8080/api/faculty`
- OAuth: `http://localhost:8080/oauth2/authorization/google`

CORS is configured in the backend to allow `http://localhost:5173`.

## 📂 Project Structure

```
src/
├── components/
│   ├── auth/              # Protected routes
│   └── students/          # Student table & update panel
├── contexts/              # Auth context
├── pages/                 # Login, Dashboard, Student Marks
├── services/              # API service layer
├── types/                 # TypeScript definitions
├── App.tsx                # Main app with routing
└── index.css              # Tailwind + custom styles
```

## 🎯 Grade Ranges

- **A**: 85-100
- **B**: 70-84.99
- **C**: 50-69.99
- **D**: 35-49.99
- **F**: 0-34.99

## 🐛 Troubleshooting

### CORS Errors
Make sure the backend is running and CORS is configured to allow `http://localhost:5173`.

### Authentication Not Working
1. Ensure backend OAuth2 is configured correctly
2. Check that you're using a Google account with "faculty" in the email
3. Clear browser cookies and try again

### Students Not Loading
1. Make sure you've selected a course from the dashboard
2. Check that the course has enrolled students
3. Verify the backend API is responding at `/api/faculty/courses/{id}/students`

## 📝 License

Part of the Faculty Grading System project.
