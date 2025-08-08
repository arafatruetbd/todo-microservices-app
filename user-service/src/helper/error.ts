// Base class for HTTP errors, extending the built-in Error class.
// Includes an HTTP status code to be used in responses.
export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

// Represents a 400 Bad Request error (client-side input errors)
export class BadRequestError extends HttpError {
  constructor(message = "Bad Request") {
    super(400, message);
  }
}

// Represents a 401 Unauthorized error (authentication failures)
export class UnauthorizedError extends HttpError {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}

// Represents a 409 Conflict error (conflicts such as duplicate resources)
export class ConflictError extends HttpError {
  constructor(message = "Conflict") {
    super(409, message);
  }
}

// Represents a 404 Not Found error (resource not found)
export class NotFoundError extends HttpError {
  constructor(message = "Not found") {
    super(404, message);
  }
}

// Represents a 403 Forbidden error (authorization failures)
export class ForbiddenError extends HttpError {
  constructor(message = "Forbidden") {
    super(403, message);
  }
}
