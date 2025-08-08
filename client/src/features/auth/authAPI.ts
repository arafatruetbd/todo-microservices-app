// src/features/auth/authAPI.ts
import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";
import type { AuthCredentials, AuthResponse } from "./types";

export const authAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, AuthCredentials>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.token,
            })
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.token,
            })
          );
        } catch {
          // do nothing or handle error
        }
      },
    }),
    login: builder.mutation<AuthResponse, AuthCredentials>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // Save token from `token` field
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.token, // note the change here
            })
          );

          // Since no user returned, you can dispatch with just token or adjust accordingly
          dispatch(
            userLoggedIn({
              accessToken: result.data.token,
            })
          );
        } catch {
          // do nothing or handle error
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authAPI;
