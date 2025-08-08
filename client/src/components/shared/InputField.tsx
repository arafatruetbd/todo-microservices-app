// src/components/InputField.tsx
import type { FieldError } from "react-hook-form";

interface Props {
  id: string;
  type?: string;
  label: string;
  register: import("react-hook-form").UseFormRegisterReturn;
  error?: FieldError;
  autoComplete?: string;
}

export default function InputField({
  id,
  type = "text",
  label,
  register,
  error,
  autoComplete,
}: Props) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={autoComplete}
          {...register}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
        />
        {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
      </div>
    </div>
  );
}
