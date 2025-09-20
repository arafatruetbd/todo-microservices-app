// src/features/api/__test__/apiSlice.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("apiSlice", () => {
  beforeEach(() => {
    vi.resetModules(); // clears module cache between tests
  });

  it("should have correct reducerPath", async () => {
    const { apiSlice } = await import("../apiSlice");
    expect(apiSlice.reducerPath).toBe("api");
  });

  it("should call createBaseQueryWithAuth with correct URL", async () => {
    const mockFn = vi.fn();
    vi.doMock("../baseQueryWithAuth", () => ({
      createBaseQueryWithAuth: mockFn,
    }));

    const { apiSlice } = await import("../apiSlice");

    expect(mockFn).toHaveBeenCalledWith("http://localhost:5000/user/api");
    expect(apiSlice).toBeDefined();
  });

  it("should have empty endpoints initially", async () => {
    const { apiSlice } = await import("../apiSlice");
    expect(typeof apiSlice.endpoints).toBe("object");
    expect(Object.keys(apiSlice.endpoints)).toHaveLength(0);
  });

  it("should have empty tagTypes initially", async () => {
    const { apiSlice } = await import("../apiSlice");

    // apiSlice has `tagTypes` but it's not exposed in type defs, so cast
    const apiWithTags = apiSlice as unknown as { tagTypes?: string[] };
    expect(apiWithTags.tagTypes ?? []).toEqual([]);
  });
});
