// src/features/auth/hooks/useAuthCheck.ts
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "@/features/auth/authSlice";
import type { AppDispatch } from "@/app/store";
import type { AuthStorage } from "@/features/auth/types/state";

export default function useAuthCheck(): boolean {
  const dispatch = useDispatch<AppDispatch>();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const localAuth = localStorage?.getItem("auth");

    if (localAuth) {
      try {
        const auth: AuthStorage = JSON.parse(localAuth);
        if (auth?.accessToken) {
          dispatch(userLoggedIn({ accessToken: auth.accessToken }));
        }
      } catch {
        // ignore invalid JSON
      }
    }

    setChecked(true); // Only run ONCE
  }, [dispatch]);

  return checked;
}
