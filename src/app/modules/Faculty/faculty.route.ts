import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';

const router = express.Router();

router.get('/:id', auth(USER_ROLES.admin), FacultyControllers.getSingleFaculty);
router.patch(
  '/:id',
  auth(USER_ROLES.admin),
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);
router.delete('/:id', auth(USER_ROLES.admin), FacultyControllers.deleteFaculty);
router.get('/', auth(USER_ROLES.admin), FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
