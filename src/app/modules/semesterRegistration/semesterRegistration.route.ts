import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { semesterRegistrationControllers } from './semesterRegistration.controller';
import { semesterRegistrationValidations } from './semesterRegistration.validation';
const route = express.Router();

route.post(
  '/',
  validateRequest(
    semesterRegistrationValidations.semesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.createSemesterRegistration,
);
route.get('/', semesterRegistrationControllers.getAllSemesterRegistration);
route.get(
  '/:id',
  semesterRegistrationControllers.getSingleSemesterRegistration,
);
route.patch('/:id', semesterRegistrationControllers.updateSemesterRegistration);

export const SemesterRegistrationRoutes = route;
