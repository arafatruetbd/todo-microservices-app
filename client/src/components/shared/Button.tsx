// src/components/shared/Button.tsx
import React from "react";

// Props interface extending the default <button> attributes
// so that all native button props (onClick, type, etc.) are supported.
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode; // Button label or nested elements
  variant?: // Optional prop to choose a predefined style
  "primary" | "secondary" | "danger" | "success" | "logout" | "cancel";
  loading?: boolean; // Optional loading state (disables button and changes label)
}

// Common base styles applied to all buttons
const baseStyles =
  "inline-flex items-center justify-center rounded-md font-medium shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2 cursor-pointer";

// Mapping of variant names to their Tailwind CSS classes
// This keeps the component reusable and consistent.
const variants: Record<string, string> = {
  primary:
    "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-700 hover:to-indigo-600 focus:ring-indigo-500",
  secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400",
  success:
    "bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 focus:ring-green-500",
  danger:
    "bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 focus:ring-red-500",
  logout:
    "bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 focus:ring-red-500",
  cancel: "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400",
};

export default function Button({
  children,
  variant = "primary", // Default to "primary" if no variant is passed
  className = "", // Allow additional Tailwind/custom classes
  loading = false, // Default loading state is false
  ...props // Spread any other <button> attributes
}: ButtonProps) {
  return (
    <button
      // Merge base styles, variant-specific styles, extra className, and disabled styles
      className={`${baseStyles} ${variants[variant]} ${className} ${
        props.disabled || loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      // Disable button when loading or explicitly disabled
      disabled={props.disabled || loading}
      {...props}
    >
      {/* Show "Loading..." when in loading state, otherwise render children */}
      {loading ? "Loading..." : children}
    </button>
  );
}
