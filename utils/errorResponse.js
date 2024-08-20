
function ErrorResponse(message, statusCode) {
    const error = new Error(message);
    error.statusCode = statusCode;

    // Maintains proper stack trace for where the error was thrown (only available on V8)
    if (Error.captureStackTrace) {
        Error.captureStackTrace(error, ErrorResponse);
    }

    return error;
}

export default ErrorResponse;
