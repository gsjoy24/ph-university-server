import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLES } from '../user/user.constant';
import { semesterRegistrationControllers } from './semesterRegistration.controller';
import { semesterRegistrationValidations } from './semesterRegistration.validation';
const route = express.Router();

route.post(
  '/',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  validateRequest(
    semesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.createSemesterRegistration,
);
route.get(
  '/',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  semesterRegistrationControllers.getAllSemesterRegistration,
);
route.get(
  '/:id',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  semesterRegistrationControllers.getSingleSemesterRegistration,
);
route.patch(
  '/:id',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  validateRequest(
    semesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.updateSemesterRegistration,
);

export const SemesterRegistrationRoutes = route;
