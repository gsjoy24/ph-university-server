import express from 'express';
import { AuthControllers } from './auth.controller';

import validateRequest from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidations.LoginUserValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/change-password',
  validateRequest(AuthValidations.changePasswordValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;
