// src/components/AuthFormLayout.tsx
import { Link } from "react-router-dom";

interface Props {
  title: string;
  children: React.ReactNode;
  alternateText: string;
  alternateLink: string;
  alternateLinkText: string;
  logoUrl?: string;
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
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img src={logoUrl} alt="Logo" className="mx-auto h-10 w-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {children}
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
