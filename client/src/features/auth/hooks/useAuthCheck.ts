// src/features/auth/hooks/useAuthCheck.ts

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "@/features/auth/authSlice";
import type { AppDispatch } from "@/app/store";
import type { AuthStorage } from "@/features/auth/types/state";

/**
 * Custom hook to check if the user is already authenticated
 * by looking into localStorage and updating Redux state accordingly.
 *
 * Returns `true` when the auth check is completed,
 * regardless of whether the user is logged in or not.
 */
export default function useAuthCheck(): boolean {
  const dispatch = useDispatch<AppDispatch>();
  const [checked, setChecked] = useState(false); // Tracks whether the check is done

  useEffect(() => {
    // Retrieve authentication data from localStorage
    const localAuth = localStorage?.getItem("auth");

    if (localAuth) {
      try {
        // Parse the stored auth data
        const auth: AuthStorage = JSON.parse(localAuth);

        // If a valid access token exists, update Redux state
        if (auth?.accessToken) {
          dispatch(userLoggedIn({ accessToken: auth.accessToken }));
        }
      } catch {
        // Ignore any JSON parsing errors (invalid stored data)
      }
    }

    // Mark the auth check as complete (runs only once on mount)
    setChecked(true);
  }, [dispatch]);

  // Return whether the check has completed
  return checked;
}
