// src/features/auth/__test__/authAPI.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { authAPI } from "../authAPI";
import authReducer from "../authSlice";
import type { AuthResponse } from "../types";

const makeStore = () =>
  configureStore({
    reducer: {
      [authAPI.reducerPath]: authAPI.reducer,
      auth: authReducer,
    },
    middleware: (gDM) => gDM().concat(authAPI.middleware),
  });

describe("authAPI slice", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("should register and update state + localStorage", async () => {
    const store = makeStore();

    const mockResponse: AuthResponse = { token: "register-token" };
    // ✅ Use real Response object so fetchBaseQuery works
    vi.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponse), { status: 200 })
    );

    const result = await store.dispatch(
      authAPI.endpoints.register.initiate({ email: "a@test.com", password: "pw" })
    );

    expect(result.data).toEqual(mockResponse);
    expect(store.getState().auth.accessToken).toBe("register-token");
    expect(localStorage.getItem("auth")).toContain("register-token");
  });

  it("should login and update state + localStorage", async () => {
    const store = makeStore();

    const mockResponse: AuthResponse = { token: "login-token" };
    vi.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponse), { status: 200 })
    );

    const result = await store.dispatch(
      authAPI.endpoints.login.initiate({ email: "b@test.com", password: "pw" })
    );

    expect(result.data).toEqual(mockResponse);
    expect(store.getState().auth.accessToken).toBe("login-token");
    expect(localStorage.getItem("auth")).toContain("login-token");
  });

  it("should not update state/localStorage on failed request", async () => {
    const store = makeStore();

    vi.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ message: "Invalid" }), { status: 401 })
    );

    const result = await store.dispatch(
      authAPI.endpoints.login.initiate({ email: "bad@test.com", password: "wrong" })
    );

    expect(result.data).toBeUndefined();
    expect(store.getState().auth.accessToken).toBeUndefined();
    expect(localStorage.getItem("auth")).toBeNull();
  });
});
