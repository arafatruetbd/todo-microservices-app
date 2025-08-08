import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithAuth } from "./baseQueryWithAuth";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: createBaseQueryWithAuth("http://localhost:5000/user/api"),
  tagTypes: [],
  endpoints: () => ({}),
});
