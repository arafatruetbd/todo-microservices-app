import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithAuth } from "./baseQueryWithAuth";

/**
 * The central API slice for Redux Toolkit Query.
 *
 * - Uses a custom `createBaseQueryWithAuth` function to automatically
 *   attach authentication headers to every request.
 * - `reducerPath` defines the key in the Redux store where RTK Query’s cache will live.
 * - `tagTypes` is empty here, but can be used for cache invalidation and refetching.
 * - `endpoints` is currently empty — you’ll extend this slice in feature-specific files.
 */
export const apiSlice = createApi({
  reducerPath: "api", // Redux store key for RTK Query’s API cache
  baseQuery: createBaseQueryWithAuth("http://localhost:5000/user/api"), // Base URL + auth middleware
  tagTypes: [], // Can be used to manage cache invalidation
  endpoints: () => ({}), // Placeholder — endpoints will be injected from other slices
});
