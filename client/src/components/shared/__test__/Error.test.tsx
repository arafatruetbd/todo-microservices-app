// src/components/shared/__test__/Error.test.tsx
import { render, screen } from "@testing-library/react";
import Error from "../Error";

describe("Error Component", () => {
  it("renders the error message", () => {
    render(<Error message="Something went wrong" />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("applies correct styling classes", () => {
    render(<Error message="Error occurred" />);
    const container = screen.getByText("Error occurred").closest("div");
    expect(container?.className).toContain("bg-red-200");
    expect(container?.className).toContain("text-red-800");
  });

  it("updates when message prop changes", () => {
    const { rerender } = render(<Error message="Initial error" />);
    expect(screen.getByText("Initial error")).toBeInTheDocument();

    rerender(<Error message="New error" />);
    expect(screen.getByText("New error")).toBeInTheDocument();
  });
});
