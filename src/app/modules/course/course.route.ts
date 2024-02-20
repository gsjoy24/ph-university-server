import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLES } from '../user/user.constant';
import { CourseControllers } from './course.controller';
import { courseValidations } from './course.validation';

const route = express.Router();

route.post(
  '/',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  validateRequest(courseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);
route.get(
  '/',
  auth(
    USER_ROLES.admin,
    USER_ROLES.superAdmin,
    USER_ROLES.faculty,
    USER_ROLES.student,
  ),
  CourseControllers.getAllCourses,
);
route.get(
  '/:id',
  auth(
    USER_ROLES.admin,
    USER_ROLES.superAdmin,
    USER_ROLES.faculty,
    USER_ROLES.student,
  ),
  CourseControllers.getSingleCourse,
);
route.patch(
  '/:id',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  validateRequest(courseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

route.put(
  '/:id/assign-faculties',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  validateRequest(courseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);

route.get(
  '/:id/faculties',
  auth(
    USER_ROLES.admin,
    USER_ROLES.superAdmin,
    USER_ROLES.faculty,
    USER_ROLES.student,
  ),
  CourseControllers.getFacultiesWithCourse,
);

route.delete(
  '/:id',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  CourseControllers.deleteCourse,
);

export const CourseRoutes = route;
