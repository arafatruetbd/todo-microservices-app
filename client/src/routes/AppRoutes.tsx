// src/routes/AppRoutes.tsx

import { Routes, Route, Navigate } from "react-router-dom";
import SigninPage from "@/pages/SigninPage";
import SignupPage from "@/pages/SignupPage";
import TodoPage from "@/pages/TodoPage";
import useAuthCheck from "@/features/auth/hooks/useAuthCheck";
import useAuth from "@/features/auth/hooks/useAuth";

export default function AppRoutes() {
  // Check if authentication status has been determined (prevents flicker or wrong redirection before data loads)
  const authChecked = useAuthCheck();

  // Boolean indicating if the user is logged in (has an access token)
  const loggedIn = useAuth();

  // Don't render routes until authentication check is complete
  if (!authChecked) return null;

  return (
    <Routes>
      {/* Public route for signing in */}
      <Route path="/signin" element={<SigninPage />} />

      {/* Public route for signing up */}
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected route for the Todo page */}
      <Route path="/todos" element={<TodoPage />} />

      {/* Catch-all route: redirects based on login state */}
      <Route
        path="*"
        element={<Navigate to={loggedIn ? "/todos" : "/signin"} />}
      />
    </Routes>
  );
}
