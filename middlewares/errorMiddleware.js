import ErrorResponse from '../utils/errorResponse.js';

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log to console for the developer
    console.error(err.stack);

    // Handle specific ErrorResponse
    if (err instanceof ErrorResponse) {
        return res.status(err.statusCode).json({
            message: err.message,
            status: "Failure",
            error: true
        });
    }

    // Handle MongoDB bad ObjectId
    if (err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    // Handle MongoDB duplicate key error
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new ErrorResponse(message, 400);
    }

    // Handle validation errors
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        error = new ErrorResponse(message, 400);
    }

    // Default to 500 server error if no specific error is caught
    res.status(error.statusCode || 500).json({
        message: error.message || 'Server Error',
        status: "Failure",
        error: true
    });
};

export default errorHandler;
