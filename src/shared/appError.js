class AppError extends Error {
  constructor(message, httpCode) {
    super(message);

    this.httpCode = httpCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
