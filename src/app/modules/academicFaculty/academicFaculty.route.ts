import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import { AcademicFacultyValidations } from './academicFaculty.validation';

const route = express.Router();

route.post(
  '/',
  validateRequest(AcademicFacultyValidations.academicFacultyValidationSchema),
  AcademicFacultyControllers.createAcademicFaculty,
);

route.get('/', AcademicFacultyControllers.getAllAcademicFaculties);
route.get('/:id', AcademicFacultyControllers.getSingleAcademicFaculty);
route.patch(
  '/:id',
  validateRequest(AcademicFacultyValidations.academicFacultyValidationSchema),
  AcademicFacultyControllers.updateAcademicFaculty,
);
route.delete('/:id', AcademicFacultyControllers.deleteAcademicFaculty);

export const AcademicFacultyRoutes = route;
