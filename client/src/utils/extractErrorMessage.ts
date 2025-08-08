// src/utils/extractErrorMessage.ts
export function extractErrorMessage(error: unknown): string {
  if (
    error &&
    typeof error === "object" &&
    "data" in error &&
    error.data &&
    typeof error.data === "object" &&
    "message" in error.data
  ) {
    const errData = error.data as { message?: string };
    return errData.message || "An unexpected error occurred.";
  }
  return "An unknown error occurred.";
}
