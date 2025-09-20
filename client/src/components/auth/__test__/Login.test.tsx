import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import Login from "../Signin";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock RTK Query useLoginMutation
const mockLogin = vi.fn();
vi.mock("@/features/auth/authAPI", () => ({
  useLoginMutation: () => [
    mockLogin,
    {
      data: { token: "mockToken" }, // ✅ Simulate success
      isLoading: false,
      error: null,
    },
  ],
}));

describe("Login Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("navigates to /todos on successful login", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Fill form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // ✅ Wait for navigate to be called
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/todos");
    });
  });
});
