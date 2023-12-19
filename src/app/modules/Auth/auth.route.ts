import express from 'express';
import { AuthControllers } from './auth.controller';
import { LoginUserValidationSchema } from './auth.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/login',
  validateRequest(LoginUserValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;
