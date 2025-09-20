// src/features/api/__test__/baseQueryWithAuth.test.ts
import { vi, describe, it, expect, beforeEach } from "vitest";
import { createBaseQueryWithAuth } from "../baseQueryWithAuth";
import { userLoggedOut } from "@/features/auth/authSlice";
import type { RootState } from "@/app/store";
import type { BaseQueryApi } from "@reduxjs/toolkit/query";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

// Mock fetchBaseQuery
const mockBaseQuery = vi.fn();
vi.mock("@reduxjs/toolkit/query/react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@reduxjs/toolkit/query/react")>();
  return {
    ...actual,
    fetchBaseQuery: () => mockBaseQuery,
  };
});

describe("createBaseQueryWithAuth", () => {
  const dispatch = vi.fn();
  const getState = vi.fn<() => RootState>();

  const baseApiContext: Pick<BaseQueryApi, "dispatch" | "getState" | "type"> = {
    dispatch,
    getState,
    type: "query",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("should attach Authorization header if token exists", async () => {
    getState.mockReturnValue({ auth: { accessToken: "mockToken" } } as RootState);

    mockBaseQuery.mockImplementation(async () => {
      const headers = new Headers();
      headers.set("Authorization", `Bearer ${getState().auth.accessToken}`);
      return { data: { headers } };
    });

    const baseQueryWithAuth = createBaseQueryWithAuth("http://test");
    const result = await baseQueryWithAuth("/todos", baseApiContext as BaseQueryApi, {});

    const headers = (result.data as { headers: Headers }).headers;
    expect(headers.get("Authorization")).toBe("Bearer mockToken");
  });

  it("should NOT attach Authorization header if no token exists", async () => {
    getState.mockReturnValue({ auth: { accessToken: undefined } } as RootState);

    mockBaseQuery.mockImplementation(async () => {
      const headers = new Headers();
      return { data: { headers } };
    });

    const baseQueryWithAuth = createBaseQueryWithAuth("http://test");
    const result = await baseQueryWithAuth("/todos", baseApiContext as BaseQueryApi, {});

    const headers = (result.data as { headers: Headers }).headers;
    expect(headers.get("Authorization")).toBeNull();
  });

  it("should dispatch userLoggedOut and clear localStorage on 401 error", async () => {
    getState.mockReturnValue({ auth: { accessToken: "expiredToken" } } as RootState);
    localStorage.setItem("auth", "mockData");

    mockBaseQuery.mockResolvedValue({ error: { status: 401 } as FetchBaseQueryError });

    const baseQueryWithAuth = createBaseQueryWithAuth("http://test");
    const result = await baseQueryWithAuth("/todos", baseApiContext as BaseQueryApi, {});

    expect(dispatch).toHaveBeenCalledWith(userLoggedOut());
    expect(localStorage.getItem("auth")).toBeNull();
    expect(result).toEqual({ error: { status: 401 } });
  });

  it("should return result if no 401 error", async () => {
    getState.mockReturnValue({ auth: { accessToken: "validToken" } } as RootState);
    const mockResponse = { data: [{ id: 1, content: "Test Todo" }] };

    mockBaseQuery.mockResolvedValue(mockResponse);

    const baseQueryWithAuth = createBaseQueryWithAuth("http://test");
    const result = await baseQueryWithAuth("/todos", baseApiContext as BaseQueryApi, {});

    expect(dispatch).not.toHaveBeenCalledWith(userLoggedOut());
    expect(result).toEqual(mockResponse);
  });
});
