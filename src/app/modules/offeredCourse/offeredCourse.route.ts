import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLES } from '../user/user.constant';
import OfferedCourseControllers from './offeredCourse.controller';
import offeredCourseValidations from './offeredCourse.validation';
const router = express.Router();

router.post(
  '/',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  validateRequest(offeredCourseValidations.createOfferCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);
router.get(
  '/',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  OfferedCourseControllers.getAllOfferedCourses,
);
router.get(
  '/my-offered-courses',
  auth(USER_ROLES.student),
  OfferedCourseControllers.getAllOfferedCourses,
);
router.get(
  '/:id',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin, USER_ROLES.student),
  OfferedCourseControllers.getSingleOfferedCourse,
);
router.patch(
  '/:id',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  validateRequest(offeredCourseValidations.updateOfferCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);
router.delete(
  '/:id',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  OfferedCourseControllers.deleteOfferedCourse,
);

export const OfferedCourseRoutes = router;
