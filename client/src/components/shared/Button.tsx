// src/components/shared/Button.tsx

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "logout"
    | "cancel";
  loading?: boolean;
}

const baseStyles =
  "inline-flex items-center justify-center rounded-md font-medium shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2 cursor-pointer";

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
  variant = "primary",
  className = "",
  loading = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className} ${
        props.disabled || loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
