import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "@/features/auth/hooks/useAuth";

interface PublicRouteProps {
  children: ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const isLoggedIn = useAuth();

  return !isLoggedIn ? children : <Navigate to="/todos" />;
}
