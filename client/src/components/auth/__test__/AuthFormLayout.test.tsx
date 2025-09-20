import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AuthFormLayout from "../AuthFormLayout";
import { describe, it, expect } from "vitest";

describe("AuthFormLayout", () => {
  const defaultProps = {
    title: "Sign In",
    alternateText: "Don't have an account?",
    alternateLink: "/register",
    alternateLinkText: "Sign Up",
  };

  it("renders the title", () => {
    render(
      <MemoryRouter>
        <AuthFormLayout {...defaultProps}>
          <form>
            <input placeholder="Email" />
          </form>
        </AuthFormLayout>
      </MemoryRouter>
    );

    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("renders the default logo if no logoUrl is provided", () => {
    render(
      <MemoryRouter>
        <AuthFormLayout {...defaultProps}>
          <div>Form content</div>
        </AuthFormLayout>
      </MemoryRouter>
    );

    const logo = screen.getByAltText("Logo") as HTMLImageElement;
    expect(logo).toBeInTheDocument();
    expect(logo.src).toContain(
      "tailwindcss.com/plus-assets/img/logos/mark.svg"
    );
  });

  it("renders a custom logo when logoUrl is provided", () => {
    render(
      <MemoryRouter>
        <AuthFormLayout
          {...defaultProps}
          logoUrl="https://example.com/logo.png"
        >
          <div>Form content</div>
        </AuthFormLayout>
      </MemoryRouter>
    );

    const logo = screen.getByAltText("Logo") as HTMLImageElement;
    expect(logo.src).toContain("https://example.com/logo.png");
  });

  it("renders children content", () => {
    render(
      <MemoryRouter>
        <AuthFormLayout {...defaultProps}>
          <form>
            <button type="submit">Submit</button>
          </form>
        </AuthFormLayout>
      </MemoryRouter>
    );

    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("renders alternate navigation link", () => {
    render(
      <MemoryRouter>
        <AuthFormLayout {...defaultProps}>
          <div>Form content</div>
        </AuthFormLayout>
      </MemoryRouter>
    );

    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Sign Up" });
    expect(link).toHaveAttribute("href", "/register");
  });
});
