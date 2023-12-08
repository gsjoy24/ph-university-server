import { NextFunction, ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';
import { handleZodError } from '../errors/handleZodError';

const globalErrorHandler: ErrorRequestHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err,
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  next: NextFunction,
) => {
  // initialize statusCode, message and errorSources with default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: err.message || 'Something went wrong!',
    },
  ];

  if (err instanceof ZodError) {
    const simplifyError = handleZodError(err);
    statusCode = simplifyError?.statusCode;
    message = simplifyError?.message;
    errorSources = simplifyError?.errorSources;
  }
  // send response
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
