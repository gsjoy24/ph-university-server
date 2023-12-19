import { z } from 'zod';

const LoginUserValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'User id is required',
      invalid_type_error: 'User id must be a string',
    }),
    password: z.string({
      required_error: 'User password is required',
      invalid_type_error: 'User password must be a string',
    }),
  }),
});

export { LoginUserValidationSchema };
