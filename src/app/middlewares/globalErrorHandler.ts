import { ErrorRequestHandler, NextFunction } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import AppError from '../errors/AppError';
import { handleCastError } from '../errors/handleCastError';
import handleValidationError from '../errors/handleValidationError';
import { handleZodError } from '../errors/handleZodError';
import { TErrorSources } from '../interface/error';

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

  // handle validation error
  if (err instanceof ZodError) {
    const simplifyError = handleZodError(err);
    statusCode = simplifyError?.statusCode;
    message = simplifyError?.message;
    errorSources = simplifyError?.errorSources;
  } else if (err.name === 'ValidationError') {
    const simplifyError = handleValidationError(err);
    statusCode = simplifyError?.statusCode;
    message = simplifyError?.message;
    errorSources = simplifyError?.errorSources;
  } else if (err.name === 'CastError') {
    const simplifyError = handleCastError(err);
    statusCode = simplifyError?.statusCode;
    message = simplifyError?.message;
    errorSources = simplifyError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }
  // send response
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
