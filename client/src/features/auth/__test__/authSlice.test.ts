// src/features/auth/__test__/authSlice.test.ts
import { describe, it, expect } from "vitest";
import reducer, { userLoggedIn, userLoggedOut } from "../authSlice";
import type { AuthState } from "../types";

describe("authSlice", () => {
  it("should return the initial state", () => {
    const initialState: AuthState = { accessToken: undefined };
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle userLoggedIn", () => {
    const initialState: AuthState = { accessToken: undefined };

    const nextState = reducer(initialState, userLoggedIn({ accessToken: "mock-token" }));

    expect(nextState.accessToken).toBe("mock-token");
  });

  it("should handle userLoggedOut", () => {
    const initialState: AuthState = { accessToken: "existing-token" };

    const nextState = reducer(initialState, userLoggedOut());

    expect(nextState.accessToken).toBeUndefined();
  });
});
