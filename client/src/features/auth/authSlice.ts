// src/features/auth/authSlice.ts

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "./types";

// Initial state for authentication
// `accessToken` is undefined when the user is logged out
const initialState: AuthState = {
  accessToken: undefined,
};

// Redux slice to manage authentication state
const authSlice = createSlice({
  name: "auth", // Slice name (used in Redux DevTools)
  initialState,
  reducers: {
    /**
     * Action: User logs in
     * Stores the access token in the state
     * @param state - Current auth state
     * @param action - Contains the new access token
     */
    userLoggedIn: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
    },

    /**
     * Action: User logs out
     * Clears the access token from the state
     */
    userLoggedOut: (state) => {
      state.accessToken = undefined;
    },
  },
});

// Export actions for use in components/hooks
export const { userLoggedIn, userLoggedOut } = authSlice.actions;

// Export the reducer to be used in the store
export default authSlice.reducer;
