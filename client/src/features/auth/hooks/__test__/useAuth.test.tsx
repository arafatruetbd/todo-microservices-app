// src/features/auth/hooks/__test__/useAuth.test.tsx
import { describe, it, expect } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { renderHook } from "@testing-library/react";
import useAuth from "../useAuth";

// Minimal fake reducer for testing
const makeStore = (authState: { accessToken?: string | null }) =>
  configureStore({
    reducer: {
      auth: () => authState,
    },
  });

describe("useAuth hook", () => {
  it("should return false when no accessToken is present", () => {
    const store = makeStore({ accessToken: null });

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toBe(false);
  });

  it("should return true when accessToken exists", () => {
    const store = makeStore({ accessToken: "mock-token" });

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toBe(true);
  });
});
