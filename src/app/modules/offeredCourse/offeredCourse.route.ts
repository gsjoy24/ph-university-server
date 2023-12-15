import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import OfferedCourseControllers from './offeredCourse.controller';
import offeredCourseValidations from './offeredCourse.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(offeredCourseValidations.createOfferCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);
router.get('/', OfferedCourseControllers.getAllOfferedCourses);
router.get('/:id', OfferedCourseControllers.getSingleOfferedCourse);
router.patch(
  '/:id',
  validateRequest(offeredCourseValidations.updateOfferCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);
router.delete('/:id', OfferedCourseControllers.deleteOfferedCourse);

export const OfferedCourseRoutes = router;
