// src/features/auth/hooks/__test__/useAuthCheck.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { renderHook, waitFor } from "@testing-library/react";
import useAuthCheck from "../useAuthCheck";
import authReducer from "@/features/auth/authSlice";

// Setup a test store with auth reducer
const makeStore = () =>
  configureStore({
    reducer: { auth: authReducer },
  });

describe("useAuthCheck hook", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("should complete check and dispatch login if token exists", async () => {
    const store = makeStore();

    // Mock localStorage with valid token
    localStorage.setItem("auth", JSON.stringify({ accessToken: "mock-token" }));

    const { result } = renderHook(() => useAuthCheck(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await waitFor(() => {
      expect(result.current).toBe(true);
    });

    expect(store.getState().auth.accessToken).toBe("mock-token");
  });

  it("should complete check without dispatch if no token", async () => {
    const store = makeStore();

    const { result } = renderHook(() => useAuthCheck(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await waitFor(() => {
      expect(result.current).toBe(true);
    });

    // Accepts both null or undefined
    expect(store.getState().auth.accessToken).toBeFalsy();
  });

  it("should handle invalid JSON gracefully", async () => {
    const store = makeStore();

    localStorage.setItem("auth", "not-json");

    const { result } = renderHook(() => useAuthCheck(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await waitFor(() => {
      expect(result.current).toBe(true);
    });

    expect(store.getState().auth.accessToken).toBeFalsy();
  });
});
