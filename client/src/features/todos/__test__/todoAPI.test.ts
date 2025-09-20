import { describe, it, expect, vi, beforeEach } from "vitest";

describe("todoAPI slice", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("should be created with tagTypes including 'Todo'", async () => {
    const spy = vi.fn();

    vi.doMock("@reduxjs/toolkit/query/react", async () => {
      const actual = await vi.importActual<
        typeof import("@reduxjs/toolkit/query/react")
      >("@reduxjs/toolkit/query/react");

      type CreateApiConfig = Parameters<typeof actual.createApi>[0];

      return {
        ...actual,
        createApi: (config: CreateApiConfig) => {
          spy(config);
          return actual.createApi(config);
        },
      };
    });

    await import("../todoAPI");

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        tagTypes: ["Todo"],
      })
    );
  });
});
