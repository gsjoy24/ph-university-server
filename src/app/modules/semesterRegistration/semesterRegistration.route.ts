import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { semesterRegistrationControllers } from './semesterRegistration.controller';
import { semesterRegistrationValidations } from './semesterRegistration.validation';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';
const route = express.Router();

route.post(
  '/',
  auth(USER_ROLES.admin),
  validateRequest(
    semesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.createSemesterRegistration,
);
route.get(
  '/',
  auth(USER_ROLES.admin),
  semesterRegistrationControllers.getAllSemesterRegistration,
);
route.get(
  '/:id',
  auth(USER_ROLES.admin),
  semesterRegistrationControllers.getSingleSemesterRegistration,
);
route.patch(
  '/:id',
  auth(USER_ROLES.admin),
  validateRequest(
    semesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.updateSemesterRegistration,
);

export const SemesterRegistrationRoutes = route;
