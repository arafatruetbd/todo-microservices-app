// src/features/api/baseQueryWithAuth.ts
import {
  fetchBaseQuery,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query";
import type { RootState } from "@/app/store";
import { userLoggedOut } from "@/features/auth/authSlice";

/**
 * Factory function to create a base query with automatic authentication handling.
 *
 * This function wraps RTK Query's `fetchBaseQuery` and:
 *  1. Automatically attaches a Bearer token (if available in Redux state) to all requests.
 *  2. Handles 401 Unauthorized errors by logging the user out and clearing local storage.
 *
 * @param baseUrl - The base URL for all API requests.
 * @returns A customized `BaseQueryFn` with token injection and error handling.
 */
export const createBaseQueryWithAuth = (
  baseUrl: string
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  // Create a standard fetchBaseQuery with base URL and token injection
  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // Get access token from Redux store
      const token = (getState() as RootState)?.auth?.accessToken;
      if (token) {
        // Attach Authorization header if token exists
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  // Return a wrapped query function to handle authentication errors
  return async (args, api, extraOptions) => {
    // Perform the API request
    const result = await baseQuery(args, api, extraOptions);

    // If unauthorized, log out user and clear local storage
    if (result.error?.status === 401) {
      api.dispatch(userLoggedOut());
      localStorage.clear();
    }

    return result;
  };
};
