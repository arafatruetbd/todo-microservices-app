// src/components/todos/__test__/Todos.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Todos from "../Todos";

// ---- Mock toast ----
vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));
import toast from "react-hot-toast";

// ---- Mock Redux ----
const mockDispatch = vi.fn();
vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: (fn: (state: { auth: { accessToken: string } }) => unknown) =>
    fn({ auth: { accessToken: "mockToken" } }),
}));

// ---- Mock RTK Query hooks ----
const mockDeleteTodo = vi.fn();
const mockCreateTodo = vi.fn();
const mockUpdateTodo = vi.fn();
const mockUseGetTodosQuery = vi.fn();

vi.mock("@/features/todos/todoAPI", () => ({
  useGetTodosQuery: (token: string) => mockUseGetTodosQuery(token),
  useDeleteTodoMutation: () => [mockDeleteTodo],
  useCreateTodoMutation: () => [mockCreateTodo, { isLoading: false }],
  useUpdateTodoMutation: () => [mockUpdateTodo, { isLoading: false }],
}));

// ---- Mock authSlice for logout ----
vi.mock("@/features/auth/authSlice", () => ({
  userLoggedOut: () => ({ type: "auth/userLoggedOut" }),
}));

// ---- Mock subcomponents ----
vi.mock("@/components/shared/LoadingSpinner", () => ({
  __esModule: true,
  default: () => <div data-testid="spinner">Loading...</div>,
}));
vi.mock("@/components/shared/Error", () => ({
  __esModule: true,
  default: ({ message }: { message: string }) => (
    <div data-testid="error">{message}</div>
  ),
}));
vi.mock("@/components/shared/Button", () => ({
  __esModule: true,
  default: ({
    children,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props}>{children}</button>
  ),
}));

describe("Todos Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading spinner while fetching", () => {
    mockUseGetTodosQuery.mockReturnValue({ isLoading: true });

    render(<Todos />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("shows error message if fetching fails", () => {
    mockUseGetTodosQuery.mockReturnValue({ isLoading: false, isError: true });

    render(<Todos />);
    expect(screen.getByTestId("error")).toHaveTextContent(
      "Failed to load todos. Please try again later."
    );
  });

  it("renders list of todos", () => {
    mockUseGetTodosQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: [{ uuid: "1", content: "Test Todo" }],
    });

    render(<Todos />);
    expect(screen.getByText(/your todos/i)).toBeInTheDocument();
    expect(screen.getByText("Test Todo")).toBeInTheDocument();
  });

  it("adds a new todo", async () => {
    mockUseGetTodosQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: [],
    });
    mockCreateTodo.mockReturnValue({ unwrap: () => Promise.resolve() });

    render(<Todos />);

    fireEvent.change(screen.getByPlaceholderText(/add a new todo/i), {
      target: { value: "New Todo" },
    });
    fireEvent.click(screen.getByText(/add/i));

    await waitFor(() => {
      expect(mockCreateTodo).toHaveBeenCalledWith({ content: "New Todo" });
      expect(toast.success).toHaveBeenCalledWith("Todo added");
    });
  });

  it("edits and saves a todo", async () => {
    mockUseGetTodosQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: [{ uuid: "1", content: "Old Todo" }],
    });
    mockUpdateTodo.mockReturnValue({ unwrap: () => Promise.resolve() });

    render(<Todos />);

    fireEvent.click(screen.getByText(/edit/i));
    fireEvent.change(screen.getByDisplayValue("Old Todo"), {
      target: { value: "Updated Todo" },
    });
    fireEvent.click(screen.getByText(/save/i));

    await waitFor(() => {
      expect(mockUpdateTodo).toHaveBeenCalledWith({
        uuid: "1",
        content: "Updated Todo",
      });
      expect(toast.success).toHaveBeenCalledWith("Todo updated");
    });
  });

  it("deletes a todo", async () => {
    render(<Todos />);

    // Use role to specifically target the button
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockDeleteTodo).toHaveBeenCalled(); // adjust if you mock differently
    });
  });

  it("logs out the user", () => {
    mockUseGetTodosQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: [],
    });

    render(<Todos />);
    fireEvent.click(screen.getByText(/logout/i));

    expect(mockDispatch).toHaveBeenCalledWith({ type: "auth/userLoggedOut" });
    expect(toast.success).toHaveBeenCalledWith("Logged out successfully");
  });
});
