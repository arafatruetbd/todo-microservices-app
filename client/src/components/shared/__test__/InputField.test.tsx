// src/components/__test__/InputField.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "../InputField";
import { vi } from "vitest";

describe("InputField Component", () => {
  const mockRegister = {
    name: "email",
    onChange: vi.fn(),
    onBlur: vi.fn(),
    ref: vi.fn(),
  };

  it("renders label and input", () => {
    render(
      <InputField
        id="email"
        label="Email Address"
        type="email"
        register={mockRegister}
      />
    );

    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toHaveAttribute(
      "type",
      "email"
    );
  });

  it("displays error message when provided", () => {
    render(
      <InputField
        id="email"
        label="Email"
        register={mockRegister}
        error={{ type: "required", message: "Email is required" }}
      />
    );

    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });

  it("applies autocomplete attribute", () => {
    render(
      <InputField
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        register={mockRegister}
      />
    );

    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "autocomplete",
      "current-password"
    );
  });

  it("allows user input", () => {
    render(<InputField id="name" label="Name" register={mockRegister} />);
    const input = screen.getByLabelText("Name") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "John Doe" } });
    expect(input.value).toBe("John Doe");
  });
});
