import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

// Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Admin
import AdminDashboard from "../pages/admin/Dashboard";
import Companies from "../pages/admin/Companies";
import Jobs from "../pages/admin/Jobs";
import Users from "../pages/admin/Users";
import Reports from "../pages/admin/Reports";
import AdminApplications from "../pages/admin/Applications";
import AdminInterviews from "../pages/admin/Interviews";

// Student
import StudentDashboard from "../pages/student/Dashboard";
import Profile from "../pages/student/Profile";
import StudentJobs from "../pages/student/Jobs";
import Applications from "../pages/student/Applications";
import Interviews from "../pages/student/Interviews";
import StudentSkills from "../pages/student/Skills";
import Settings from "../pages/student/Settings";

// Mentor
import MentorDashboard from "../pages/mentor/Dashboard";
import Students from "../pages/mentor/Students";
import MentorApplications from "../pages/mentor/Applications";
import MentorInterviews from "../pages/mentor/Interviews";
import Feedback from "../pages/mentor/Feedback";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="Admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/companies"
          element={
            <ProtectedRoute allowedRole="Admin">
              <Companies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/jobs"
          element={
            <ProtectedRoute allowedRole="Admin">
              <Jobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/applications"
         element={
          <ProtectedRoute allowedRole="Admin">
              <AdminApplications />
           </ProtectedRoute>
            }
           />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRole="Admin">
              <Users />
            </ProtectedRoute>
          }
        />


        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute allowedRole="Admin">
              <Reports />
            </ProtectedRoute>
          }
        />
           <Route
              path="/admin/interviews"
               element={
              <ProtectedRoute allowedRole="Admin">
               <AdminInterviews />
               </ProtectedRoute>
               }
        />
        {/* ================= STUDENT ================= */}

        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRole="Student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/profile"
          element={
            <ProtectedRoute allowedRole="Student">
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/jobs"
          element={
            <ProtectedRoute allowedRole="Student">
              <StudentJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/applications"
          element={
            <ProtectedRoute allowedRole="Student">
              <Applications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/interviews"
          element={
            <ProtectedRoute allowedRole="Student">
              <Interviews />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/skills"
          element={
            <ProtectedRoute allowedRole="Student">
              <StudentSkills />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/settings"
          element={
            <ProtectedRoute allowedRole="Student">
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* ================= MENTOR ================= */}

        <Route
          path="/mentor/dashboard"
          element={
            <ProtectedRoute allowedRole="Mentor">
              <MentorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mentor/students"
          element={
            <ProtectedRoute allowedRole="Mentor">
              <Students />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mentor/applications"
          element={
            <ProtectedRoute allowedRole="Mentor">
              <MentorApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mentor/interviews"
          element={
            <ProtectedRoute allowedRole="Mentor">
              <MentorInterviews />
            </ProtectedRoute>
          }
        />
          <Route
            path="/mentor/interviews"
           element={
            <ProtectedRoute allowedRole="Mentor">
               <MentorInterviews />
            </ProtectedRoute>
           }
           />
        <Route
          path="/mentor/feedback"
          element={
            <ProtectedRoute allowedRole="Mentor">
              <Feedback />
            </ProtectedRoute>
          }
        />

        {/* 404 */}

        <Route
          path="*"
          element={<h1 className="text-center mt-20 text-3xl">404 - Page Not Found</h1>}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;