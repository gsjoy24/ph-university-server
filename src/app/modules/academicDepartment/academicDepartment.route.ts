import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  AcademicDepartmentValidationSchema,
  UpdateAcademicDepartmentValidationSchema,
} from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { USER_ROLES } from '../user/user.constant';
import auth from '../../middlewares/auth';

const route = express.Router();

route.post(
  '/',
  validateRequest(AcademicDepartmentValidationSchema),
  AcademicDepartmentController.createAcademicDepartment,
);
route.get(
  '/',
  auth(USER_ROLES.admin, USER_ROLES.faculty),
  AcademicDepartmentController.getAllAcademicDepartments,
);
route.get('/:id', AcademicDepartmentController.getSingleAcademicDepartment);
route.patch(
  '/:id',
  validateRequest(UpdateAcademicDepartmentValidationSchema),
  AcademicDepartmentController.updateAcademicDepartment,
);
route.delete('/:id', AcademicDepartmentController.deleteAcademicDepartment);

export const AcademicDepartmentRoutes = route;
