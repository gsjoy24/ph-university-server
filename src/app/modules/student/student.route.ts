import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';
const route = express.Router();

route.get('/', StudentControllers.getAllStudent);
route.get('/:id', StudentControllers.getSingleStudent);
route.patch(
  '/:id',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);
route.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoutes = route;
