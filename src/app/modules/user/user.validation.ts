import z from 'zod';
import { UserStatus } from './user.constant';

const userValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: 'Password must be string!' })
    .max(20, { message: 'Password can not be more than 20 characters.' }),
});

const changeUserStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});
const userValidations = {
  userValidationSchema,
  changeUserStatusValidationSchema,
};

export default userValidations;
