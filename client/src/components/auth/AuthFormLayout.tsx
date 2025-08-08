// src/components/AuthFormLayout.tsx
import { Link } from "react-router-dom";

interface Props {
  title: string; // Title displayed above the form (e.g., "Sign In", "Register")
  children: React.ReactNode; // The actual form content passed as children
  alternateText: string; // Text shown for the alternate action (e.g., "Don't have an account?")
  alternateLink: string; // Route path for the alternate action (e.g., "/register")
  alternateLinkText: string; // Text for the alternate link (e.g., "Sign Up")
  logoUrl?: string; // Optional logo URL, defaults to TailwindCSS logo
}

export default function AuthFormLayout({
  title,
  children,
  alternateText,
  alternateLink,
  alternateLinkText,
  logoUrl = "https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600",
}: Props) {
  return (
    // Outer container to center the form vertically and horizontally
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      {/* Logo and Title Section */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* App Logo */}
        <img src={logoUrl} alt="Logo" className="mx-auto h-10 w-auto" />

        {/* Form Title */}
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h2>
      </div>

      {/* Form Content + Alternate Navigation */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {/* Main Form passed from parent component */}
        {children}

        {/* Alternate navigation link (e.g., "Don't have an account? Sign Up") */}
        <p className="mt-10 text-center text-sm text-gray-500">
          {alternateText}{" "}
          <Link
            to={alternateLink}
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            {alternateLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
}
