import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';
const route = express.Router();

route.get('/', auth(USER_ROLES.admin), StudentControllers.getAllStudent);
route.get('/:id', auth(USER_ROLES.admin), StudentControllers.getSingleStudent);
route.patch(
  '/:id',
  auth(USER_ROLES.admin),
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);
route.delete('/:id', auth(USER_ROLES.admin), StudentControllers.deleteStudent);

export const StudentRoutes = route;
