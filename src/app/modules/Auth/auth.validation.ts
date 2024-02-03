import { z } from 'zod';

const LoginUserValidationSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'User id is required',
      invalid_type_error: 'User id must be a string',
    }),
    password: z.string({
      required_error: 'User password is required',
      invalid_type_error: 'User password must be a string',
    }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'old password is required',
    }),
    newPassword: z.string({
      required_error: 'New password is required',
      invalid_type_error: 'New password must be a string',
    }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required',
    }),
  }),
});

const forgotPasswordValidationSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'User id is required',
    }),
  }),
});
const resetPasswordValidationSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'User id is required',
    }),
    newPassword: z.string({
      required_error: 'User password is required',
      invalid_type_error: 'User password must be a string',
    }),
  }),
});

export const AuthValidations = {
  LoginUserValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
  forgotPasswordValidationSchema,
  resetPasswordValidationSchema,
};
