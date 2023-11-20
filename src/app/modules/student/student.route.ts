import express from 'express';
import { StudentControllers } from './student.controller';
const route = express.Router();

route.post('/create-student', StudentControllers.createStudent);
route.get('/', StudentControllers.getAllStudent);
route.get('/:studentId', StudentControllers.getSingleStudent);

export const StudentRoutes = route;
