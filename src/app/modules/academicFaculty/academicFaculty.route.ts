import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLES } from '../user/user.constant';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import { AcademicFacultyValidations } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLES.superAdmin, USER_ROLES.superAdmin),
  validateRequest(AcademicFacultyValidations.academicFacultyValidationSchema),
  AcademicFacultyControllers.createAcademicFaculty,
);

router.get(
  '/',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin, USER_ROLES.faculty),
  AcademicFacultyControllers.getAllAcademicFaculties,
);
router.get(
  '/:id',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin, USER_ROLES.faculty),
  AcademicFacultyControllers.getSingleAcademicFaculty,
);
router.patch(
  '/:id',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  validateRequest(AcademicFacultyValidations.academicFacultyValidationSchema),
  AcademicFacultyControllers.updateAcademicFaculty,
);
router.delete(
  '/:id',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  AcademicFacultyControllers.deleteAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
