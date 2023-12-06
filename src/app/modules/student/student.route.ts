import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';
const route = express.Router();

route.get('/', StudentControllers.getAllStudent);
route.get('/:studentId', StudentControllers.getSingleStudent);
route.patch(
  '/:studentId',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);
route.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = route;
