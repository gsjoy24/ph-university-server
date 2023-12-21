import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';

const route = express.Router();

route.get(
  '/',
  auth(USER_ROLES.admin),
  AcademicSemesterControllers.getAllAcademicSemesters,
);
route.post(
  '/create-academic-semester',
  auth(USER_ROLES.admin),
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);
route.get(
  '/:id',
  auth(USER_ROLES.admin),
  AcademicSemesterControllers.getSingleAcademicSemester,
);
route.patch(
  '/:id',
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemester,
);
route.delete(
  '/:id',
  auth(USER_ROLES.admin),
  AcademicSemesterControllers.deleteAcademicSemester,
);

export const AcademicSemesterRoutes = route;
