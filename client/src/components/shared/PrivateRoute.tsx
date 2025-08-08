import * as React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "@/features/auth/hooks/useAuth";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactElement;
}) {
  const loggedIn = useAuth();

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}
