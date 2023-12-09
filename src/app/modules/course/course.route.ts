import express from 'express';
import { CourseControllers } from './course.controller';
const route = express.Router();

route.get('/', CourseControllers.getAllCourses);
route.get('/:id', CourseControllers.getSingleCourse);
route.patch('/:id', CourseControllers.updateCourse);
route.delete('/:id', CourseControllers.deleteCourse);

export const StudentRoutes = route;
