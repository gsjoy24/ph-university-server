import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { semesterRegistrationControllers } from './semesterRegistration.controller';
import { semesterRegistrationValidations } from './semesterRegistration.validation';
const route = express.Router();

route.post(
  '/',
  validateRequest(
    semesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.createSemesterRegistration,
);
route.get('/', semesterRegistrationControllers.getAllSemesterRegistration);
route.get(
  '/:id',
  semesterRegistrationControllers.getSingleSemesterRegistration,
);
route.patch(
  '/:id',
  validateRequest(
    semesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.updateSemesterRegistration,
);

export const SemesterRegistrationRoutes = route;
