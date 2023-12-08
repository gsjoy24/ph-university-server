import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';

export const handleZodError = (err: ZodError) => {
  const statusCode = 400;
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => ({
    path: issue?.path[issue.path.length - 1],
    message: issue.message,
  }));

  return {
    statusCode,
    message: 'validation error on input data',
    errorSources,
  };
};
