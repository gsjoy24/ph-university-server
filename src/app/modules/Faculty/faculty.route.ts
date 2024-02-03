import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLES } from '../user/user.constant';
import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';

const router = express.Router();

router.get(
  '/:id',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  FacultyControllers.getSingleFaculty,
);
router.patch(
  '/:id',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);
router.delete(
  '/:id',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  FacultyControllers.deleteFaculty,
);
router.get(
  '/',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  FacultyControllers.getAllFaculties,
);

export const FacultyRoutes = router;
