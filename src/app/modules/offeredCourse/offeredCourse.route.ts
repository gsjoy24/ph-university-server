import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import OfferedCourseControllers from './offeredCourse.controller';
import offeredCourseValidations from './offeredCourse.validation';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';
const router = express.Router();

router.post(
  '/',
  auth(USER_ROLES.admin),
  validateRequest(offeredCourseValidations.createOfferCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);
router.get(
  '/',
  auth(USER_ROLES.admin),
  OfferedCourseControllers.getAllOfferedCourses,
);
router.get(
  '/:id',
  auth(USER_ROLES.admin),
  OfferedCourseControllers.getSingleOfferedCourse,
);
router.patch(
  '/:id',
  auth(USER_ROLES.admin),
  validateRequest(offeredCourseValidations.updateOfferCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);
router.delete(
  '/:id',
  auth(USER_ROLES.admin),
  OfferedCourseControllers.deleteOfferedCourse,
);

export const OfferedCourseRoutes = router;
