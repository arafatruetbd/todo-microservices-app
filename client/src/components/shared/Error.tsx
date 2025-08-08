interface ErrorProps {
  message: string;
}

export default function Error({ message }: ErrorProps) {
  return (
    <div className="flex justify-center w-full">
      <div className="relative bg-red-200 max-w-xl px-4 py-2 text-red-800 rounded shadow w-full text-center">
        <span className="block text-sm">{message}</span>
      </div>
    </div>
  );
}
