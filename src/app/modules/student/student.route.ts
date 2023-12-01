import express from 'express';
import { StudentControllers } from './student.controller';
const route = express.Router();

route.get('/', StudentControllers.getAllStudent);
route.get('/:studentId', StudentControllers.getSingleStudent);
route.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = route;
