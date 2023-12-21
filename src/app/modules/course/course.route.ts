import express from 'express';
import { CourseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidations } from './course.validation';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';
const route = express.Router();

route.post(
  '/',
  auth(USER_ROLES.admin),
  validateRequest(courseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);
route.get(
  '/',
  auth(USER_ROLES.admin, USER_ROLES.faculty, USER_ROLES.student),
  CourseControllers.getAllCourses,
);
route.get('/:id', CourseControllers.getSingleCourse);
route.patch(
  '/:id',
  auth(USER_ROLES.admin),
  validateRequest(courseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);
route.put(
  '/:id/assign-faculties',
  auth(USER_ROLES.admin),
  CourseControllers.assignFacultiesWithCourse,
);
route.delete('/:id', auth(USER_ROLES.admin), CourseControllers.deleteCourse);

export const CourseRoutes = route;
