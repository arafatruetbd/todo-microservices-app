//src/components/shared/PublicRoute.tsx
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "@/features/auth/hooks/useAuth";

interface PublicRouteProps {
  children: ReactNode; // Components/pages to render if the route is public
}

/**
 * A wrapper for routes that should only be accessible to
 * unauthenticated (public) users.
 *
 * - If the user is logged in, they are redirected to the "/todos" page.
 * - If the user is NOT logged in, the public route content is displayed.
 */
export default function PublicRoute({ children }: PublicRouteProps) {
  // Check authentication status
  const isLoggedIn = useAuth();

  // Show public page if not logged in, else redirect to main app page
  return !isLoggedIn ? children : <Navigate to="/todos" />;
}
