import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminControllers } from './admin.controller';
import { updateAdminValidationSchema } from './admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';

const router = express.Router();

router.get('/', auth(USER_ROLES.admin), AdminControllers.getAllAdmins);

router.get('/:id', auth(USER_ROLES.admin), AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  auth(USER_ROLES.admin),
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete(
  '/:adminId',
  auth(USER_ROLES.admin),
  AdminControllers.deleteAdmin,
);

export const AdminRoutes = router;
