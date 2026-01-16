// Error handling middleware for Express.js applications
export const errorHandler = (err, req, res, next) => {
    // Log the error stack trace to the console for debugging purposes
    console.error(err.stack);
    // Set the response status code and send a JSON response with the error message
    // Default to 500 Internal Server Error if no specific status code is set
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ error: message });
};