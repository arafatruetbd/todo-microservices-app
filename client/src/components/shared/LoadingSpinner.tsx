// src/components/shared/LoadingSpinner.tsx
/**
 * LoadingSpinner Component
 *
 * This is a reusable loading indicator component that displays
 * a centered spinning circle. It's useful for showing feedback
 * to the user when data is being fetched or a process is ongoing.
 *
 * Tailwind CSS utility classes are used for styling:
 * - `flex items-center justify-center` → centers the spinner horizontally and vertically.
 * - `min-h-[200px]` → ensures the spinner has a minimum height to prevent layout shifts.
 * - `animate-spin` → applies the spinning animation.
 * - `rounded-full` → makes the spinner circular.
 * - `border-t-4 border-b-4` → creates the visible spinner edges.
 * - `border-indigo-500` → sets the spinner's color.
 */
export default function LoadingSpinner() {
  return (
    <div
      data-testid="spinner-container"
      className="flex items-center justify-center min-h-[200px] w-full"
    >
      <div
        data-testid="spinner-circle"
        className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"
      ></div>
    </div>
  );
}
