import express from 'express';
import { UserControllers } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLES } from './user.constant';
import userValidations from './user.validation';
const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLES.admin),
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLES.admin),
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  auth(USER_ROLES.admin),
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);

router.patch(
  '/change-status/:id',
  auth(USER_ROLES.admin),
  validateRequest(userValidations.changeUserStatusValidationSchema),
  UserControllers.changeUserStatus,
);
export const UserRoutes = router;
