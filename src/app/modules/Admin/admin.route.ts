import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLES } from '../user/user.constant';
import { AdminControllers } from './admin.controller';
import { updateAdminValidationSchema } from './admin.validation';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  AdminControllers.getAllAdmins,
);

router.get(
  '/:id',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  AdminControllers.getSingleAdmin,
);

router.patch(
  '/:id',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete(
  '/:adminId',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  AdminControllers.deleteAdmin,
);

export const AdminRoutes = router;
