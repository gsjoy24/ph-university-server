import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLES } from '../user/user.constant';
import { StudentControllers } from './student.controller';
import { studentValidations } from './student.validation';
const route = express.Router();

route.get(
  '/',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  StudentControllers.getAllStudent,
);
route.get(
  '/:id',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  StudentControllers.getSingleStudent,
);
route.patch(
  '/:id',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);
route.delete(
  '/:id',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  StudentControllers.deleteStudent,
);

export const StudentRoutes = route;
