import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';

const route = express.Router();

route.get('/', AcademicSemesterControllers.getAllAcademicSemesters);
route.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);
route.get('/:id', AcademicSemesterControllers.getSingleAcademicSemester);
route.patch(
  '/:id',
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemester,
);
route.delete('/:id', AcademicSemesterControllers.deleteAcademicSemester);

export const AcademicSemesterRoutes = route;
