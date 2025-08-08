// src/features/auth/authAPI.ts

import { apiSlice } from "../api/apiSlice"; // Base RTK Query API slice
import { userLoggedIn } from "./authSlice"; // Redux action to set logged-in user/token in state
import type { AuthCredentials, AuthResponse } from "./types"; // Type definitions

// Extend the base apiSlice with authentication endpoints
export const authAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // =======================
    // REGISTER endpoint
    // =======================
    register: builder.mutation<AuthResponse, AuthCredentials>({
      query: (data) => ({
        url: "/auth/register", // Backend route for user registration
        method: "POST", // HTTP method
        body: data, // Data sent in the request body
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          // Wait for the API response
          const result = await queryFulfilled;

          // Store the token in localStorage for persistence
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.token, // Token from API response
            })
          );

          // Update Redux state with the new token
          dispatch(
            userLoggedIn({
              accessToken: result.data.token,
            })
          );
        } catch {
          // Optional: handle registration error (currently ignored)
        }
      },
    }),

    // =======================
    // LOGIN endpoint
    // =======================
    login: builder.mutation<AuthResponse, AuthCredentials>({
      query: (data) => ({
        url: "/auth/login", // Backend route for user login
        method: "POST", // HTTP method
        body: data, // Credentials sent in the request body
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          // Wait for the API response
          const result = await queryFulfilled;

          // Save token from API into localStorage
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.token,
            })
          );

          // Update Redux state with the token
          dispatch(
            userLoggedIn({
              accessToken: result.data.token,
            })
          );
        } catch {
          // Optional: handle login error (currently ignored)
        }
      },
    }),
  }),
});

// Export React hooks for the register and login mutations
export const { useLoginMutation, useRegisterMutation } = authAPI;
