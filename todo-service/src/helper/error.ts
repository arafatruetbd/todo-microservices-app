// src/helper/error.ts

// Custom error class to represent "Not Found" errors
export class NotFoundError extends Error {
  constructor(message = "Not found") {
    super(message);
    this.name = "NotFoundError"; // Set error name for easier identification
  }
}

// Custom error class to represent "Forbidden" errors (authorization failures)
export class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.name = "ForbiddenError"; // Set error name for easier identification
  }
}
