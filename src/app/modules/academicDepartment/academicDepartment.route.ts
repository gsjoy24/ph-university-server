import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidationSchema } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';

const route = express.Router();

route.post(
  '/',
  validateRequest(AcademicDepartmentValidationSchema),
  AcademicDepartmentController.createAcademicDepartment,
);
route.get('/', AcademicDepartmentController.getAllAcademicDepartments);
route.get('/:id', AcademicDepartmentController.getSingleAcademicDepartment);
route.patch(
  '/:id',
  validateRequest(AcademicDepartmentValidationSchema),
  AcademicDepartmentController.updateAcademicDepartment,
);
route.delete('/:id', AcademicDepartmentController.deleteAcademicDepartment);

export const AcademicDepartmentRoutes = route;
