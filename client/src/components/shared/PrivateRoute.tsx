//src/components/shared/PrivateRoute.tsx
import * as React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "@/features/auth/hooks/useAuth";

/**
 * A wrapper component that protects routes from being accessed
 * by unauthenticated users.
 *
 * - If the user is not logged in, they are redirected to the login page.
 * - If authenticated, the protected children components are rendered.
 */
export default function PrivateRoute({
  children,
}: {
  children: React.ReactElement; // The protected component(s) to render
}) {
  // Custom hook to check if the user is authenticated
  const loggedIn = useAuth();

  // If the user is not logged in, navigate to the login page
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  // Otherwise, render the protected children components
  return children;
}
