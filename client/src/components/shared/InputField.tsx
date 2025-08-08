// src/components/InputField.tsx
import type { FieldError } from "react-hook-form";

interface Props {
  /** Unique identifier for the input field, also used for label association */
  id: string;

  /** Input type (text, email, password, etc.), defaults to "text" */
  type?: string;

  /** Label text displayed above the input */
  label: string;

  /** react-hook-form's register function output for this field */
  register: import("react-hook-form").UseFormRegisterReturn;

  /** Validation error object from react-hook-form for this field */
  error?: FieldError;

  /** Browser autocomplete attribute value */
  autoComplete?: string;
}

/**
 * A reusable input field component integrated with react-hook-form.
 *
 * Features:
 * - Accessible label linked via htmlFor/id
 * - Displays validation error messages
 * - Styled with Tailwind CSS
 */
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
      {/* Field label */}
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
      </label>

      <div className="mt-2">
        {/* Input element with react-hook-form registration */}
        <input
          id={id}
          type={type}
          autoComplete={autoComplete}
          {...register}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
        />

        {/* Error message display */}
        {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
      </div>
    </div>
  );
}
