import express from 'express';
import { CourseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidations } from './course.validation';
const route = express.Router();

route.post(
  '/',
  validateRequest(courseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);
route.get('/', CourseControllers.getAllCourses);
route.get('/:id', CourseControllers.getSingleCourse);
route.patch(
  '/:id',
  validateRequest(courseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);
route.delete('/:id', CourseControllers.deleteCourse);

export const CourseRoutes = route;
