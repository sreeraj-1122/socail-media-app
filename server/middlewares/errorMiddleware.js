// errorMiddleware.js
const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging
  
    // Check if the error has a status code; otherwise, default to 500 (Internal Server Error)
    const statusCode = err.statusCode || 500;
    
    // Send the error response with a message and optional details
    res.status(statusCode).json({
      success: false,
      message: err.message || 'Internal Server Error',
      stack: process.env.NODE_ENV === 'production' ? null : err.stack // Hide stack trace in production
    });
  };
  
  export default errorMiddleware;
  