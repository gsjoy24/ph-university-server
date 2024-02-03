import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLES } from '../user/user.constant';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { AcademicSemesterValidations } from './academicSemester.validation';

const route = express.Router();

route.get(
  '/',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  AcademicSemesterControllers.getAllAcademicSemesters,
);
route.post(
  '/create-academic-semester',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);
route.get(
  '/:id',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
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
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  AcademicSemesterControllers.deleteAcademicSemester,
);

export const AcademicSemesterRoutes = route;
