import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../utils/sendImgToCloudinary';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { studentValidations } from '../student/student.validation';
import { USER_ROLES } from './user.constant';
import { UserControllers } from './user.controller';
import userValidations from './user.validation';
const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);

router.patch(
  '/change-status/:id',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  validateRequest(userValidations.changeUserStatusValidationSchema),
  UserControllers.changeUserStatus,
);

router.get(
  '/me',
  auth(
    USER_ROLES.admin,
    USER_ROLES.superAdmin,
    USER_ROLES.faculty,
    USER_ROLES.student,
  ),
  UserControllers.getMe,
);

export const UserRoutes = router;
