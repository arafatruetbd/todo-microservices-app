import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/features/api/apiSlice"; // Base RTK Query API slice (generic API)
import { todoAPI } from "@/features/todos/todoAPI"; // Todo-specific RTK Query API slice
import authReducer from "@/features/auth/authSlice"; // Authentication state reducer

// Configure the Redux store
export const store = configureStore({
  reducer: {
    // Authentication state slice
    auth: authReducer,

    // Add RTK Query's generated reducer for the base API slice
    [apiSlice.reducerPath]: apiSlice.reducer,

    // Add RTK Query's generated reducer for the todo API slice
    [todoAPI.reducerPath]: todoAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    // Default middleware + RTK Query middleware for API caching, invalidation, etc.
    getDefaultMiddleware().concat(apiSlice.middleware, todoAPI.middleware),
});

// Types for strongly-typed hooks (useAppDispatch, useAppSelector)
export type RootState = ReturnType<typeof store.getState>; // Shape of the entire Redux state
export type AppDispatch = typeof store.dispatch; // Type for dispatch function
