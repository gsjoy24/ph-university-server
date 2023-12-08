import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

export const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = 404;
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    statusCode,
    message: 'invalid id',
    errorSources,
  };
};
