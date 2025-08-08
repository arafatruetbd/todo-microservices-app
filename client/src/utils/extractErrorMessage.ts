// src/utils/extractErrorMessage.ts

/**
 * Safely extracts an error message string from an unknown error object.
 *
 * This utility checks if the error object contains a `data.message` property,
 * which is a common format for API error responses (e.g., { data: { message: "Error" } }).
 * If found, it returns the message; otherwise, it falls back to generic error messages.
 *
 * @param error - The error object of unknown type (could be from API, network, etc.)
 * @returns A string describing the error.
 */
export function extractErrorMessage(error: unknown): string {
  // Check if error is an object and has a 'data' property
  if (
    error &&
    typeof error === "object" &&
    "data" in error &&
    error.data &&
    typeof error.data === "object" &&
    "message" in error.data
  ) {
    // Cast to expected type and retrieve message
    const errData = error.data as { message?: string };
    return errData.message || "An unexpected error occurred.";
  }
  // Fallback if structure doesn't match expected format
  return "An unknown error occurred.";
}
