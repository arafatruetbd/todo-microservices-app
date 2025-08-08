//src/components/shared/Error.tsx
// Props interface for the Error component
// `message` will hold the error text to display
interface ErrorProps {
  message: string;
}

// A reusable UI component to display error messages in a styled red box
export default function Error({ message }: ErrorProps) {
  return (
    <div className="flex justify-center w-full">
      {/* Error container with styling: red background, rounded corners, shadow */}
      <div className="relative bg-red-200 max-w-xl px-4 py-2 text-red-800 rounded shadow w-full text-center">
        {/* Display the error message in smaller font */}
        <span className="block text-sm">{message}</span>
      </div>
    </div>
  );
}
