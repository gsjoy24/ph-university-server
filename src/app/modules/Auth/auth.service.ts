import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TChangePassword, TLoginUser, TResetPassword } from './auth.interface';
import config from '../../config';
import { createToken } from './auth.utils';
import { sendEmail } from '../../utils/sendEmai';
import { Admin } from '../Admin/admin.model';
import { Student } from '../student/student.model';
import { Faculty } from '../Faculty/faculty.model';

const loginUser = async (payload: TLoginUser) => {
  const { id, password } = payload;

  // check if the user is exist
  const user = await User.isUserExistsByCustomId(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // check if the user is deleted
  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }

  // check if the user is blocked
  if (user?.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

  // check if the password is correct
  const isPasswordMatch = await User.isPasswordMatched(
    password,
    user?.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Invalid credentials');
  }

  const jwtPayload = {
    id: user?.id,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expiration as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expiration as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: TChangePassword,
) => {
  const { oldPassword, newPassword } = payload;

  // check if the user is exist
  const user = await User.isUserExistsByCustomId(userData.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // check if the user is deleted
  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }

  // check if the user is blocked
  if (user?.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

  // check if the password is correct
  const isPasswordMatch = await User.isPasswordMatched(
    oldPassword,
    user?.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match');
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_round),
  );
  const result = await User.findOneAndUpdate(
    {
      id: userData.id,
      role: userData.role,
    },
    {
      password: hashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return result;
};

const refreshToken = async (token: string) => {
  // check if the user send the token
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  // check if the token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { id, iat } = decoded;

  // check if the user is exist
  const user = await User.isUserExistsByCustomId(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // check if the user is deleted
  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }

  // check if the user is blocked
  if (user?.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

  if (
    user?.passwordChangedAt &&
    User.isJwtIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  const jwtPayload = {
    id: user?.id,
    role: user?.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expiration as string,
  );
  return {
    accessToken,
  };
};

const forgotPassword = async (id: string) => {
  // check if the user is exist
  const user = await User.isUserExistsByCustomId(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // check if the user is deleted
  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }

  // check if the user is blocked
  if (user?.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

  const jwtPayload = {
    id: user?.id,
    role: user?.role,
  };
  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '15m',
  );
  const resetUILink = `${config.app_url}?id=${user.id}&token=${resetToken}`;
  sendEmail(user?.email, resetUILink);
  return;
};

const resetPassword = async (payload: TResetPassword, token: string) => {
  const { id, newPassword } = payload;
  const user = await User.isUserExistsByCustomId(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // check if the user is deleted
  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }

  // check if the user is blocked
  if (user?.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

  // check if the token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  if (decoded.id !== user?.id) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized!');
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_round),
  );

  const result = await User.findOneAndUpdate(
    {
      id: decoded.id,
      role: decoded.role,
    },
    {
      password: hashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
  return result;
};

const getMe = async (id: string, role: string) => {
  let result = null;
  if (role === 'admin') {
    result = await Admin.findOne({ id }).populate('user');
  } else if (role === 'student') {
    result = await Student.findOne({ id }).populate('user');
  } else if (role === 'faculty') {
    result = await Faculty.findOne({ id }).populate('user');
  }
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  return result;
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgotPassword,
  resetPassword,
  getMe,
};
