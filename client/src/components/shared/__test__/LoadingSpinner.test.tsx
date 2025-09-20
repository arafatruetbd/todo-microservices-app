// src/components/shared/__test__/LoadingSpinner.test.tsx
import { render, screen } from "@testing-library/react";
import LoadingSpinner from "../LoadingSpinner";

describe("LoadingSpinner Component", () => {
  it("renders the spinner container", () => {
    render(<LoadingSpinner />);
    const container = screen.getByTestId("spinner-container");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(
      "flex items-center justify-center min-h-[200px] w-full"
    );
  });

  it("renders the spinning circle", () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByTestId("spinner-circle");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass(
      "animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"
    );
  });
});
