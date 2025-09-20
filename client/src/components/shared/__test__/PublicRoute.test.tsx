// src/components/shared/__test__/PublicRoute.test.tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi } from "vitest";
import PublicRoute from "../PublicRoute";

// Mock the useAuth hook
const mockUseAuth = vi.fn();
vi.mock("@/features/auth/hooks/useAuth", () => ({
  __esModule: true,
  default: () => mockUseAuth(),
}));

describe("PublicRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders children if user is NOT authenticated", () => {
    mockUseAuth.mockReturnValue(false);

    render(
      <MemoryRouter initialEntries={["/public"]}>
        <Routes>
          <Route
            path="/public"
            element={
              <PublicRoute>
                <div>Public Content</div>
              </PublicRoute>
            }
          />
          <Route path="/todos" element={<div>Todos Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/public content/i)).toBeInTheDocument();
  });

  it("redirects to /todos if user IS authenticated", () => {
    mockUseAuth.mockReturnValue(true);

    render(
      <MemoryRouter initialEntries={["/public"]}>
        <Routes>
          <Route
            path="/public"
            element={
              <PublicRoute>
                <div>Public Content</div>
              </PublicRoute>
            }
          />
          <Route path="/todos" element={<div>Todos Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/todos page/i)).toBeInTheDocument();
  });
});
