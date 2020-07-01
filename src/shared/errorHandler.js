const errorHandler = (error, req, res, next) => {
  error.httpCode = error.httpCode || 500;

  res.status(error.httpCode).json({
    status: error.status,
    error,
    message: error.message,
    stack: error.stack,
  });
};

export default errorHandler;
