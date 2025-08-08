// src/features/auth/hooks/useAuth.ts

import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";

/**
 * Custom hook to check if the user is authenticated.
 *
 * This hook uses the Redux state to determine whether
 * an `accessToken` exists for the current session.
 *
 * @returns {boolean} - Returns `true` if the user is logged in (has an access token), otherwise `false`.
 */
export default function useAuth(): boolean {
  // Access the `auth` slice of the Redux store
  const auth = useSelector((state: RootState) => state.auth);

  // Return true if accessToken exists, false otherwise
  return !!auth?.accessToken;
}
