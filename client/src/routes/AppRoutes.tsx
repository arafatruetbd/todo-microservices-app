// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import SigninPage from "@/pages/SigninPage";
import SignupPage from "@/pages/SignupPage";
import TodoPage from "@/pages/TodoPage";
import useAuthCheck from "@/features/auth/hooks/useAuthCheck";
import useAuth from "@/features/auth/hooks/useAuth";

export default function AppRoutes() {
  const authChecked = useAuthCheck();
  const loggedIn = useAuth();

  if (!authChecked) return null; // or a loader

  return (
    <Routes>
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/todos" element={<TodoPage />} />
      <Route
        path="*"
        element={<Navigate to={loggedIn ? "/todos" : "/signin"} />}
      />
    </Routes>
  );
}
