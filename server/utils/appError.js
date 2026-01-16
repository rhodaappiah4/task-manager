// Custom error class to handle application-specific errors
// Extends the built-in Error class to include a status code
export class AppError extends Error {
    // Create a new AppError instance with a message and status code
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}